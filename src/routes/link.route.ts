import { Application, Router } from "express";
import { body, check, param } from "express-validator";
import { shorten_url, delete_link, search_for_URL, find_my_URLs, update_link_info, get_URL_info, get_url_page_count, import_url } from "../controllers/link.controller.js";
import { redirect_to_original_URL } from './../controllers/link.controller.js';
import { getUserID, verifyUser } from './../middlewares/authentication.js';
import check_for_bad_request from './../middlewares/badRequest.js';
const link_router = Router();

link_router.post('/shorten',
    body('originalURL').not().isEmpty().withMessage('The originalURL Parameter is required.'),
    check_for_bad_request,
    getUserID, shorten_url);

link_router.get('/search',
    verifyUser,
    check('query').not().isEmpty().withMessage('Write One or More Words.'),
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

link_router.post('/import',
    verifyUser,
    body('ownerID').not().isEmpty().withMessage('The ownerID Parameter is required.'),
    body('originalURL').not().isEmpty().withMessage('The originalURL Parameter is required.'),
    body('shortURL').not().isEmpty().withMessage('The shortURL Parameter is required.'),
    body('title').not().isEmpty().withMessage('The title Parameter is required.'),
    body('category').not().isEmpty().withMessage('The category Parameter is required.'),
    body('img').not().isEmpty().withMessage('The img Parameter is required.'),
    check_for_bad_request,
    verifyUser, import_url);

link_router.get('/count',
    check('category').exists().withMessage('Category is Required'),
    check_for_bad_request,
    verifyUser,
    get_url_page_count);

const router_handler = (app: Application): void => {
    app.use('/link', link_router);

    app.get('/my/link',
        verifyUser,
        check('page').isInt({ min: 1 }).withMessage('Page No Must be Integer value greater than 0'),
        check('category').exists().withMessage('category is Required'),
        check_for_bad_request,
        find_my_URLs);

    app.get('/my/link/:id', getUserID,
        get_URL_info);

    app.get('/:URL',
        redirect_to_original_URL);

}
export default router_handler;