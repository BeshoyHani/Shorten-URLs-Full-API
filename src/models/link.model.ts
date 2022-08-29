import mongoose from "mongoose";
import { nanoid } from "nanoid/async";
import { connectDB, disconnectDB } from "../db/db.js";
import ILink from './../interfaces/link.interface.js';
const resultsPerPage = 10;

const Link_Schema = new mongoose.Schema<ILink>({
    userID: String,

    shortURL: {
        type: String,
        required: true
    },
    originalURL: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'None'
    }
});

const Link_Model = mongoose.model('link', Link_Schema);

export default class Link {

    async shortenURL(userID: string, originalURL: string, title: string, category: string, url_preview: string):
        Promise<ILink | undefined> {
        try {
            const shortURL = await nanoid(15);
            await connectDB();
            const link = new Link_Model({
                userID: userID,
                shortURL: shortURL,
                originalURL: originalURL,
                title: title,
                img: url_preview,
                category: category
            });
            await link.save();
            disconnectDB();
            return link;

        } catch (err) {
            disconnectDB();
            console.log(err);
        }
    }

    async getOriginalURL(shortID: string): Promise<ILink | null | undefined> {
        try {
            await connectDB();
            const link = await Link_Model.findOne({ shortURL: shortID });
            await Link_Model.findOneAndUpdate({ shortURL: shortID }, { $inc: { clicks: 1 } });
            disconnectDB();
            return link;
        } catch (err) {
            disconnectDB();
            console.log(err);
        }
    }

    async updateURLInfo(linkID: string, title: string, category: string): Promise<ILink | null | undefined> {
        try {
            await connectDB();
            const link = await Link_Model.findByIdAndUpdate(linkID, { $set: { title, category } });
            disconnectDB();
            return link;
        } catch (err) {
            disconnectDB();
            console.log(err);
        }
    }

    async findMyURLs(userID: string, pageNo: number): Promise<ILink[] | null | undefined> {
        try {
            await connectDB();
            const link = await Link_Model.find({ userID: userID }, null, { limit: resultsPerPage, skip: (pageNo - 1) * resultsPerPage });
            disconnectDB();
            return link;
        } catch (err) {
            disconnectDB();
            console.log(err);
        }
    }

    async searchForURL(userID: string, keywords: string): Promise<ILink[] | null | undefined> {
        try {
            await connectDB();
            const link = await Link_Model.find({
                $and: [
                    { userID: userID },
                    {
                        $or: [{ title: { "$regex": keywords, "$options": "i" } },
                        { category: { "$regex": keywords, "$options": "i" } }]
                    }
                ]
            });
            disconnectDB();
            return link;
        } catch (err) {
            disconnectDB();
            console.log(err);
        }
    }

    async deleteURL(linkID: string): Promise<void> {
        try {
            await connectDB();
            await Link_Model.deleteOne({ _id: linkID });
            disconnectDB();
            return;
        } catch (error) {
            disconnectDB();
            console.log(error);
        }
    }
}
