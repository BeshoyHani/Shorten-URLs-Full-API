import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import IUser from './../interfaces/user.interface.js';

export const verifyUser = (_req: Request, res: Response, next: NextFunction): void => {
    try {
        const data = decodeToken(_req.headers.authorization as string);
        const user = data.user as IUser;
        _req.user = user;
        next();
    } catch (error) {
        res.status(401).end('Unauthorized Access');
    }
}

export const getUserID = (_req: Request, res: Response, next: NextFunction) => {
    if (_req.headers.authorization) {
        const data = decodeToken(_req.headers.authorization);
        const user = data.user as IUser;
        _req.user = user;
    } else {
        _req.user = {
            _id: '',
            username: '',
            password: ''
        };
    }

    next();
}

const decodeToken = (auth: string): jwt.JwtPayload => {
    const token = auth.split(' ')[1];
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload;
    return data;
}