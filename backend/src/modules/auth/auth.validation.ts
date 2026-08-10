import { z } from "zod";


export const registerSchema = z.object({

    companyName:
        z.string()
        .min(2),

    firstName:
        z.string()
        .min(1),

    lastName:
        z.string()
        .min(1),

    email:
        z.string()
        .email(),

    password:
        z.string()
        .min(8)

});