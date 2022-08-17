import { Request, Response } from "express";
import LinkModel from '../models/link.model.js';
import { generate_preview_img } from './URLPreview.controller';

const Link = new LinkModel();

export const redirect_to_original_URL = async (_req: Request, res: Response): Promise<void> => {
    const shortURL = _req.params.URL as string;
    try {
        const link = await Link.getOriginalURL(shortURL);
        const originalURL = link?.originalURL as string
        res.status(301).redirect(originalURL);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const shorten_url = async (_req: Request, res: Response): Promise<void> => {
    const userID = _req.user._id as string;
    const { originalURL, title, description, category } = _req.body;
    const url_preview_link = await generate_preview_img(originalURL);
    try {
        const link = await Link.shortenURL(userID, originalURL, title, description, category, url_preview_link);
        res.status(200).json(link);
        if (!userID) {
            setTimeout(() => {
                Link.deleteURL(link?._id as string)
            }, 5000);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const search_for_URL = async (_req: Request, res: Response): Promise<void> => {
    const query = _req.body.query as string;
    const userID = _req.user._id as string;
    try {
        const links = await Link.searchForURL(userID, query);
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const update_link_info = async (_req: Request, res: Response): Promise<void> => {
    let { linkID, title, description, category } = _req.body;
    title = title ? title : '';
    description = description ? description : '';
    category = category ? category : 'None';
    if (!linkID) {
        res.status(400).json('The linkID Parameter is required.');
        return;
    }
    try {
        await Link.updateURLInfo(linkID, title, description, category);
        res.status(200).json('Updated Successfully');
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const find_my_URLs = async (_req: Request, res: Response): Promise<void> => {
    const userID = _req.user._id as string;
    const pageNO = Number(_req.body.pageNo);
    try {
        const results = await Link.findMyURLs(userID, pageNO);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const delete_link = async (_req: Request, res: Response): Promise<void> => {
    const ID = _req.body.linkID as string;
    try {
        await Link.deleteURL(ID);
        res.status(200).json('Deleted Successfully');
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}
