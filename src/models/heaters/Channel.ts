import { z } from "zod";

export const ChannelSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    mode: z.string(),
  })
  .transform((input) => ({
    id: input.id,
    name: input.name,
    modeId: input.mode,
  }));

export type Channel = z.infer<typeof ChannelSchema>;
