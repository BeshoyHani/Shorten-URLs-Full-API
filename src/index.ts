import express, { NextFunction, Request, Response } from 'express';
import "dotenv/config";
import link_router from './routes/link.route.js';
import user_router from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;

// app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
//     res.end("beshoy Hani");
// });

app.use(function (_req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'https://be-h.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cookieParser());
app.use(express.json());
user_router(app);
link_router(app);

app.listen(port, () => {
    console.log('Server Started on port 3000');
})