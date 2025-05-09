import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import 'dotenv/config';
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config
const app = express();
const port = process.env.PORT || 4000;

//Database connection
await connectDB();
await connectCloudinary();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get("/", ( req, res ) => {
    res.send("API is Working");
});

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
