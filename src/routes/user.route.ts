import { Application, Router } from "express";
import { body, oneOf } from "express-validator";
import { login, logout, register, update_user } from './../controllers/user.controller.js';
import { verifyUser } from './../middlewares/authentication.js';
import check_for_bad_request from './../middlewares/badRequest.js';

const user_router = Router();

user_router.post('/login',
    oneOf([body('username').exists(), body('email').exists()], 'you must provide your username or email'),
    body('password').exists().withMessage('password must be at least 6 digits long'),
    check_for_bad_request,
    login);

user_router.post('/register',
    body('username').exists().withMessage('username is Required!'),
    body('email').exists().withMessage('Email is Required').isEmail().withMessage('Email must be in a valid format!'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 digits long'),
    check_for_bad_request,
    register);

user_router.post('/logout',
    logout);

export const router_handler = (app: Application): void => {
    app.post('/account/edit',
        verifyUser, body('password').isLength({ min: 6 }).withMessage('password must be at least 6 digits long'),
        check_for_bad_request,
        update_user);

    app.use(user_router);
};

export default router_handler;