import { z } from "zod";

export const ActionSchema = z.enum(["open", "close", "stop"]);

export type Action = z.infer<typeof ActionSchema>;
