import { date, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(5)
});

export const ProjectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar().notNull(),
  userInput: varchar(),
  device: varchar(),
  createdAt: date().defaultNow(),
  config: json(),
  userId: varchar().references(() => usersTable.email).notNull()
})