import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser())
app.use('/api/', userRoutes);
app.use('/api/', taskRoutes);



export default app