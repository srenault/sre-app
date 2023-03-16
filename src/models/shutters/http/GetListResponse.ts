import { z } from "zod";
import { ShutterSchema } from "../Shutter";
import { ActionSchema } from "../Action";

export const GetListResponseSchema = z.object({
  shutters: z.array(ShutterSchema),
  action: z.array(ActionSchema),
});

export type GetListResponse = z.infer<typeof GetListResponseSchema>;
