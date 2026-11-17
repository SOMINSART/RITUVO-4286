import { z } from "zod";
import { count } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

export const quiz = {
  submit: base
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().max(60).optional(),
        answers: z.record(z.string(), z.unknown()),
      }),
    )
    .handler(async ({ input }) => {
      const [lead] = await db
        .insert(schema.quizLeads)
        .values({ email: input.email, firstName: input.firstName, answers: input.answers })
        .returning({ id: schema.quizLeads.id });
      return { ok: true, id: lead.id };
    }),
  stats: base.handler(async () => {
    const [row] = await db.select({ n: count() }).from(schema.quizLeads);
    return { total: row?.n ?? 0 };
  }),
};
