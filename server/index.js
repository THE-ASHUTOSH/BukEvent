import express, { urlencoded } from 'express';
import eventRoutes from './routes/events.routes.js';
import cors from 'cors';
import connectdb from './db/dbconfig.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
     // Replace with your frontend URL
    origin: 'http://localhost:5173',
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

app.listen(5000,()=>{
    console.log("server is running properly")
})