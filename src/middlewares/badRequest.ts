import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const check_for_bad_request = (_req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(_req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()[0].msg });
    } else {
        console.log(errors)
        next();
    }
}
export default check_for_bad_request;