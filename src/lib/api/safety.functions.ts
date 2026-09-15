import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Audit trail for red-flag screening. Records timestamp + flagged question IDs
// server-side so a safety event is never only client-state.
export const logRedFlagEvent = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().default(""),
      flaggedQuestionIds: z.array(z.number()),
      occurredAt: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    console.warn("[RED-FLAG]", JSON.stringify(data));
    return { logged: true, loggedAt: new Date().toISOString() };
  });
