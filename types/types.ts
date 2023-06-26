import { z } from "zod";

//firebase where options schema

export const OptionSchema = z.object({
  fieldPath: z.string(),
  opStr: z.enum([
    "<",
    "<=",
    "==",
    ">",
    ">=",
    "!=",
    "array-contains",
    "array-contains-any",
    "in",
    "not-in",
  ]),
  value: z.union([z.string(), z.number()]),
});

export type OptionSchema = z.infer<typeof OptionSchema>;

export const Timestamp = z.object({
  seconds: z.number(),
  nanoseconds: z.number(),
});
