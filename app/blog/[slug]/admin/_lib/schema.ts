import { z } from "zod";

export const postFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  content: z.string().min(1, "Content is required"),
  thumbnailId: z.number().nullable(),
  isPublished: z.boolean(),
  tagIds: z.array(z.number()),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
