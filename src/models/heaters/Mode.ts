import { z } from "zod";

export const ModeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Mode = z.infer<typeof ModeSchema>;
