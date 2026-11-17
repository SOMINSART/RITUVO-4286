import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const quizLeads = sqliteTable("quiz_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  firstName: text("first_name"),
  answers: text("answers", { mode: "json" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
