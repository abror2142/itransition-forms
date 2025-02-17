import { z } from "zod";

export const FormMetaDataSchema = z.object({
    topics: z.array(z.object({
        id: z.number(),
        name: z.string()
    })),
    tags: z.array(z.object({
        id: z.number(),
        name: z.string()
    })),
    types: z.array(z.object({
        id: z.number(),
        name: z.string()
    })),
    users: z.array(z.object({
        id: z.number(),
        email: z.string()
    }))
})

export type FormMetaData = z.infer<typeof FormMetaDataSchema>;