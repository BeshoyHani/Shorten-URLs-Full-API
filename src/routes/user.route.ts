import { Application, Router } from "express";
import { login, register } from './../controllers/user.controller.js';

const user_router = Router();

user_router.post('/login', login);
user_router.post('/register', register);

export const router_handler = (app: Application): void => {
    //app.use('/account/edit');
    app.use(user_router);
};

export default router_handler;