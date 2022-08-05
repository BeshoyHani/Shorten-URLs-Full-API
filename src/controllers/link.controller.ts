import { Request, Response } from "express";
import { deleteURL, getOriginalURL, shortenURL } from '../models/link.model';

export const get_original_url = async (_req: Request, res: Response): Promise<void> => {
    const shortURL = _req.body.shortURL as string;
    if (!shortURL) {
        res.status(400).json('The shortURL Parameter is required.');
        return;
    }
    try {
        const link = await getOriginalURL(shortURL);
        const originalURL = link?.originalURL as string
        res.status(301).redirect(originalURL);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const shorten_url = async (_req: Request, res: Response): Promise<void> => {
    const url = _req.body.originalURL as string;
    const userID = '';
    const title = (_req.body.title || '') as string;
    const description = (_req.body.description || '') as string;
    const category = (_req.body.category || '') as string;
    if (!url) {
        res.status(400).json('The originalURL parameter is required.');
    }
    try {
        const link = await shortenURL(userID, url, title, description, category);
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const delete_link = async (_req: Request, res: Response) => {
    const ID = _req.body.linkID as string;
    if (!ID) {
        res.status(400).json('The linkID Parameter is required.');
        return;
    }
    try {
        await deleteURL(ID);
        res.status(200).json('Deleted Successfully');
    } catch (error) {
        res.status(500).json((error as Error).message);
    }
}