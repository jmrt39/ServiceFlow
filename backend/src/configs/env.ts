import dotenv from "dotenv";
import { z } from "zod";


dotenv.config();


const envSchema = z.object({

    NODE_ENV: z
        .enum([
            "development",
            "test",
            "production"
        ])
        .default("development"),


    PORT: z
        .string()
        .transform(Number)
        .default(5000),


    APP_NAME: z
        .string()
        .default("ServiceFlow API"),


    JWT_SECRET: z
        .string()
        .min(10),


    DATABASE_URL: z
        .string()
        .optional(),


    REDIS_URL: z
        .string()
        .optional()

});


export const env =
    envSchema.parse(process.env);