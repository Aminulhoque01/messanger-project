import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from "cors"

dotenv.config();
const app = express();

// Use body parsing middleware before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
// app.use(cors({
//     origin: "http://localhost:5173", // Allow your frontend origin
//     credentials: true, // Allow cookies to be sent
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
//     allowedHeaders: ['Content-Type', 'Authorization'] // Allow headers as needed
// }));
app.use(cors({
    origin: '*', // Allow all origins (only for development)
}));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});





mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));