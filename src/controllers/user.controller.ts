import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const User = new UserModel();

const validate_user_input = (username: string, password: string): boolean => {
    if (!(username && password)) {
        return false;
    }
    return true;
}

export const login = async (_req: Request, res: Response): Promise<void> => {

    const { username, password } = _req.body;
    try {
        const user = await User.login(username, password);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
        res.status(200).json({ token });
    } catch (error) {
        res.status(404).json((error as Error).message);
    }
}

export const register = async (_req: Request, res: Response): Promise<void> => {
    const { username, password } = _req.body;
    try {
        const user = await User.register(username, password);
        res.status(200).json(`user ${username} is created successfully`);
    } catch (error) {
        res.status(409).json((error as Error).message);
    }
}

export const update_user = async (_req: Request, res: Response): Promise<void> => {
    const { password } = _req.body;
    const userID = _req.user._id as string;
    try {
        const user = await User.update(userID, password);
        res.status(200).json(`user ${user?.username} is updated successfully`);
    } catch (error) {
        res.status(500).json((error as Error).message);
    }

}