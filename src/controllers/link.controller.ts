import { Request, Response } from "express";
import LinkModel from '../models/link.model.js';
import { generate_preview_img } from './URLPreview.controller.js';
const twelveHours = 43200000;
const Link = new LinkModel();

export const redirect_to_original_URL = async (_req: Request, res: Response): Promise<void> => {
    const shortURL = _req.params.URL as string;
    try {
        const link = await Link.getOriginalURL(shortURL);
        const originalURL = link?.originalURL as string
        res.status(301).redirect(originalURL)
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const shorten_url = async (_req: Request, res: Response): Promise<void> => {
    const baseHost = _req.headers.host as string;
    const userID = _req.user._id as string;
    const { originalURL, title, description, category } = _req.body;
    let url_preview_link;
    try {
        url_preview_link = await generate_preview_img(originalURL);
    } catch (error) {
        url_preview_link = '';
    }
    try {
        const link = await Link.shortenURL(userID, originalURL, title, category, url_preview_link, baseHost);
        res.status(200).json(link);
        if (!userID) {
            setTimeout(() => {
                Link.deleteURL(link?._id as string)
            }, twelveHours);
        }
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const search_for_URL = async (_req: Request, res: Response): Promise<void> => {
    const query = _req.body.query as string;
    const userID = _req.user._id as string;
    try {
        const links = await Link.searchForURL(userID, query);
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json((error as Error).message);
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
        await Link.updateURLInfo(linkID, title, category);
        res.status(200).json('Updated Successfully');
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const find_my_URLs = async (_req: Request, res: Response): Promise<void> => {
    const userID = _req.user._id as string;
    const category = _req.query.category as string;
    const pageNO = Number(_req.query.page);
    try {
        const results = await Link.findMyURLs(userID, category, pageNO);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const get_URL_info = async (_req: Request, res: Response): Promise<void> => {
    const id = _req.params.id as string;
    try {
        const results = await Link.getURLInfo(id);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}

export const get_url_page_count = async (_req: Request, res: Response): Promise<void> => {
    const userID = _req.user._id as string;
    const category = _req.query.category as string;
    try {
        const count = await Link.getURLsPageCount(userID, category);
        res.status(200).json({ count });
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
