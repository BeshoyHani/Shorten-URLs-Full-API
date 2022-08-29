import { Application, Router } from "express";
import { body } from "express-validator";
import { shorten_url, delete_link, search_for_URL, find_my_URLs, update_link_info } from "../controllers/link.controller.js";
import { redirect_to_original_URL } from './../controllers/link.controller.js';
import { getUserID, verifyUser } from './../middlewares/authentication.js';
import check_for_bad_request from './../middlewares/badRequest';
const link_router = Router();

link_router.post('/shorten',
    body('originalURL').not().isEmpty().withMessage('The originalURL Parameter is required.'),
    check_for_bad_request,
    getUserID, shorten_url);

link_router.get('/search',
    verifyUser,
    body('query').not().isEmpty().withMessage('Write One or More Words.'),
    check_for_bad_request,
    search_for_URL);

link_router.post('/update',
    verifyUser,
    body('linkID').not().isEmpty().withMessage('The linkID Parameter is required.'),
    check_for_bad_request,
    update_link_info
)

link_router.post('/delete',
    verifyUser,
    body('linkID').not().isEmpty().withMessage('The linkID Parameter is required.'),
    check_for_bad_request,
    verifyUser, delete_link);

link_router.get('/redirect/:URL',
    check_for_bad_request,
    redirect_to_original_URL);

const router_handler = (app: Application): void => {
    app.use('/link', link_router);

    app.get('/my/link', verifyUser,
        body('pageNo').isInt({ min: 1 }).withMessage('Page No Must be Integer value greater than 0'),
        check_for_bad_request,
        find_my_URLs);

}
export default router_handler;