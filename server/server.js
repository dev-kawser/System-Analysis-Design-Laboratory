import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";


//app config
const app = express();
const port = process.env.PORT || 4000;

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get("/", ( req, res ) => {
    res.send("API is Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
