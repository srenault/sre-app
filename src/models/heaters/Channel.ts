import { z } from "zod";

export const ChannelSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    mode: z.number(),
  })
  .transform((input) => ({
    id: input.id,
    name: input.name,
    modeId: input.mode,
  }));

export type Channel = z.infer<typeof ChannelSchema>;
