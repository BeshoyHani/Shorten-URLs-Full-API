import { Application, Router } from "express";
import { body } from "express-validator";
import { login, register, update_user } from './../controllers/user.controller.js';
import { verifyUser } from './../middlewares/authentication';
import check_for_bad_request from './../middlewares/badRequest';

const user_router = Router();

user_router.post('/login',
    body('username').exists().withMessage('username is Required!'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 digits long'),
    check_for_bad_request,
    login);

user_router.post('/register',
    body('username').exists().withMessage('username is Required!'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 digits long'),
    check_for_bad_request,
    register);

export const router_handler = (app: Application): void => {
    app.post('/account/edit',
        verifyUser, body('password').isLength({ min: 6 }).withMessage('password must be at least 6 digits long'),
        check_for_bad_request,
        update_user);

    app.use(user_router);
};

export default router_handler;