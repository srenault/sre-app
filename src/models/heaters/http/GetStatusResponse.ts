import { z } from "zod";
import { ModeSchema } from "../Mode";
import { ChannelSchema } from "../Channel";

export const GetStatusResponseSchema = z.object({
  modes: z.array(ModeSchema),
  channels: z.array(ChannelSchema),
});

export type GetStatusResponse = z.infer<typeof GetStatusResponseSchema>;
