import { z } from "zod";

export const ShutterSchema = z.object({
  id: z.number(),
  label: z.string(),
});

export type Shutter = z.infer<typeof ShutterSchema>;
