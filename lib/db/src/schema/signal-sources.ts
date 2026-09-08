import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const signalSourcesTable = pgTable("signal_sources", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("NOT_CONNECTED"),
  channelCount: integer("channel_count").notNull().default(0),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSignalSourceSchema = createInsertSchema(signalSourcesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertSignalSource = z.infer<typeof insertSignalSourceSchema>;
export type SignalSource = typeof signalSourcesTable.$inferSelect;