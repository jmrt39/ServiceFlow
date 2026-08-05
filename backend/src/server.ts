import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import "express-async-errors";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(cors());

app.use(helmet());

app.use(express.json());


// Health Check

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "success",
        message: "ServiceFlow API is running",
        timestamp: new Date()
    });

});

//404 Handler
app.use(notFound);

//Global Error Handler
app.use(errorHandler);


// Start Server

app.listen(PORT, () => {

    console.log(
        `ServiceFlow API running on port ${PORT}`
    );

});