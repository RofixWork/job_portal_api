import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
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
const app = express();

// MIDDLEWARES
app.use(express.static('public'))
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

app.post('/api/v1/test', validateTest,(req, res) => {
    const {name} = req.body;
    console.log({
        message: `Hello ${name}!`,
        timestamp: new Date().toISOString(),
    });
    
    res.send({
        message: `Hello ${name}!`,
        timestamp: new Date().toISOString(),
    });
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