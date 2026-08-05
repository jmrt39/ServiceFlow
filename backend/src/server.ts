import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./configs/env.js"

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";


const app = express();

const PORT = env.PORT;


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
        `${env.APP_NAME} running on port ${PORT}`
    );

});