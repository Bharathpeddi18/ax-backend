import z from "zod";

export const schemaCreateAnnouncement = z.object({
    id: z.string().uuid(),
    title: z.string().trim().min(1).max(256),
    description: z.string().trim().min(1),
    expiry_date: z.coerce.date(),
    is_archived: z.boolean(),
    created_at: z.coerce.date(),
    modified_at: z.coerce.date(),
    created_by: z.string().uuid(),
    modified_by: z.string().uuid(),
});

export const schemaUpdateAnnouncement = z.object({
    id: z.string().uuid(),
    title: z.string().trim().min(1).max(256),
    description: z.string().trim().min(1),
    expiry_date: z.coerce.date(),
    is_archived: z.boolean(),
    modified_at: z.coerce.date(),
    modified_by: z.string().uuid(),
})