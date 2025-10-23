import express, { urlencoded } from 'express';
import eventRoutes from './routes/events.routes.js';
import cors from 'cors';
import connectdb from './db/dbconfig.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

connectdb();

app.use(eventRoutes);
app.use(authRoutes);

app.get('/',(req,res)=>{
    res.cookie('token', "ashutosh")
    res.send("hello from backend")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});