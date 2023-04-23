import { z } from "zod";

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
