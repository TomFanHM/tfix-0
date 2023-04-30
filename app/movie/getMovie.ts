import { z } from "zod";

export const MovieSheme = z.object({
  id: z.number(),
  original_language: z.string().nullable(),
  original_title: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string().nullable(),
  release_date: z.string().nullable(),
  title: z.string().nullable(),
  poster_path: z.string().nullable(),
});

export type MovieSheme = z.infer<typeof MovieSheme>;
