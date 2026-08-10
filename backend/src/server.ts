import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./configs/env.js";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { prisma } from "./database/prisma.js";

import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

const PORT = env.PORT;

app.get("/test", (req, res) => {
    res.send("TEST WORKS");
});

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

// API Routes
app.use("/api/auth", authRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
    try {
        await prisma.$connect();

        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`${env.APP_NAME} running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

startServer();