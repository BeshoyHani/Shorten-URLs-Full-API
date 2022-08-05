import express, { NextFunction, Request, Response } from 'express';
import link_router  from './routes/link.route';

const app = express();

// app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
//     res.end("beshoy Hani");
// });
app.use(express.urlencoded({extended: true}));
link_router(app)

app.listen(3000, ()=>{
    console.log('Server Started on port 3000');
})