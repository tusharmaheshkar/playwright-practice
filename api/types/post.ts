import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const CreatePostSchema = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number(),
  id: z.number().optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type CreatePostPayload = z.infer<typeof CreatePostSchema>;
