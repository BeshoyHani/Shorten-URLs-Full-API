import express, { NextFunction, Request, Response } from 'express';
import "dotenv/config";
import link_router from './routes/link.route.js';
import user_router from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;

//  app.use( (_req: Request, res: Response, next: NextFunction) => {
//      console.log(_req.headers.host)
//  });
const allowedOrigins = ['https://be-h.vercel.app', 'https://be-h.netlify.app', 'http://localhost:4000'];

// app.use(function (_req: Request, res: Response, next: NextFunction) {
//     const origin = _req.headers.origin as string;
//     //if (allowedOrigins.includes(origin)) {
//         //console.log(origin)
//         //}
//     res.setHeader('Access-Control-Allow-Origin', origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
}));

app.use(cookieParser());
app.use(express.json());
user_router(app);
link_router(app);

app.listen(port, () => {
    console.log('Server Started on port 3000');
})