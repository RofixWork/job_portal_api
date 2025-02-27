import 'express-async-errors';
import 'dotenv/config';
import express, { response } from 'express';
import morgan from 'morgan';
import notFoundMiddleware from './middlewares/not-found.js';
import errorHanlderMiddleware from './middlewares/error-handler.js';
import jobRouter from './routes/job.routes.js';
import connectDB from './db/connect.js';
import { validateTest } from './middlewares/validation.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { authenticationMiddleware } from './middlewares/authentication.js';
import userRouter from './routes/user.routes.js';
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import express_mongo_sanitize from "express-mongo-sanitize";
import cors from "cors";
import path from 'path';
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
  })
);
app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin || "*");
    },
    credentials: true,
  })
);
app.use(express_mongo_sanitize()); 

// MIDDLEWARES
app.use(express.static(path.resolve('public')))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
if(process.env.NODE_ENV === 'development') { 
    app.use(morgan('dev'));
}
//AUTH & USER
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticationMiddleware, userRouter)
//job router
app.use('/api/v1/jobs', authenticationMiddleware, jobRouter);

app.get('/api/v1/test', (req, res) => {
    return  res.send('<h1>TEST</h1>')
});

//CUSTOM MIDDLEWARES
app.use(notFoundMiddleware);
app.use(errorHanlderMiddleware);

const PORT = process.env.PORT || 8000;
(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    } catch (error) {
        console.error(error);
        
    }
})();