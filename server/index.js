import express from 'express';
import eventRoutes from './routes/events.routes.js';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use(eventRoutes);

app.listen(5000,()=>{
    console.log("server is running properly")
})