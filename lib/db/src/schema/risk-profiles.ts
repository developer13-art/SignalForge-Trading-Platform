import { createInsertSchema } from "drizzle-zod";
import { boolean, integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const riskProfilesTable = pgTable("risk_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  riskPerTrade: numeric("risk_per_trade", { precision: 5, scale: 2 }).notNull().default("1"),
  maxDailyLoss: numeric("max_daily_loss", { precision: 12, scale: 2 }).notNull().default("0"),
  maxOpenTrades: integer("max_open_trades").notNull().default(0),
  minimumConfidence: numeric("minimum_confidence", { precision: 5, scale: 2 }).notNull().default("80"),
  emergencyStop: boolean("emergency_stop").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertRiskProfileSchema = createInsertSchema(riskProfilesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertRiskProfile = z.infer<typeof insertRiskProfileSchema>;
export type RiskProfile = typeof riskProfilesTable.$inferSelect;