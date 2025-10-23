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

const allowedOrigins = [
  "http://localhost:5173",
    FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

connectdb();
console.log("CORS allowed origin:", process.env.FRONTEND_URL);

app.use(eventRoutes);
app.use(authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});