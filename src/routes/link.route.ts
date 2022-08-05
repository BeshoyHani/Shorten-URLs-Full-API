import { Application, Router } from "express";
import { shorten_url, delete_link } from "../controllers/link.controller";
import { get_original_url } from './../controllers/link.controller';
const link_router = Router();

link_router.post('/shorten', shorten_url)
link_router.post('/delete', delete_link)
//link_router.get('/:id', get_original_url)
link_router.get('/all', (req, res) => { console.log(req.url); res.end('link') })


const router_handler = (app: Application): void => {
    app.use('/link', link_router);
    app.get('/:id', get_original_url);
}

export default router_handler;