import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const incomingMessagesTable = pgTable(
  "incoming_messages",
  {
    id: text("id").primaryKey(),
    sourceId: text("source_id").notNull(),
    userId: text("user_id").notNull(),
    externalMessageId: text("external_message_id"),
    rawText: text("raw_text").notNull(),
    fingerprint: text("fingerprint").notNull(),
    classification: text("classification").notNull().default("PENDING"),
    processingStatus: text("processing_status").notNull().default("RECEIVED"),
    receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sourceExternalMessageUnique: uniqueIndex("incoming_source_external_message_unique").on(
      table.sourceId,
      table.externalMessageId,
    ),
    sourceFingerprintIndex: uniqueIndex("incoming_source_fingerprint_unique").on(
      table.sourceId,
      table.fingerprint,
    ),
  }),
);

export const signalsTable = pgTable("signals", {
  id: text("id").primaryKey(),
  messageId: text("message_id").notNull().unique(),
  sourceId: text("source_id").notNull(),
  providerId: text("provider_id"),
  userId: text("user_id").notNull(),
  symbol: text("symbol").notNull(),
  direction: text("direction").notNull(),
  entryType: text("entry_type").notNull().default("MARKET"),
  entry: numeric("entry", { precision: 18, scale: 8 }),
  stopLoss: numeric("stop_loss", { precision: 18, scale: 8 }),
  takeProfit1: numeric("take_profit_1", { precision: 18, scale: 8 }),
  takeProfit2: numeric("take_profit_2", { precision: 18, scale: 8 }),
  takeProfit3: numeric("take_profit_3", { precision: 18, scale: 8 }),
  timeframe: text("timeframe"),
  signalType: text("signal_type").notNull().default("TRADE"),
  confidence: numeric("confidence", { precision: 5, scale: 2 }),
  status: text("status").notNull().default("POTENTIAL"),
  fingerprint: text("fingerprint").notNull(),
  validationSummary: jsonb("validation_summary").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const signalAnalysesTable = pgTable("signal_analyses", {
  id: text("id").primaryKey(),
  signalId: text("signal_id").notNull().unique(),
  model: text("model").notNull(),
  result: jsonb("result").$type<Record<string, unknown>>().notNull(),
  confidence: numeric("confidence", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const signalDecisionsTable = pgTable("signal_decisions", {
  id: text("id").primaryKey(),
  signalId: text("signal_id").notNull(),
  userId: text("user_id").notNull(),
  eligibilityStatus: text("eligibility_status").notNull().default("PENDING"),
  eligible: boolean("eligible").notNull().default(false),
  riskApproved: boolean("risk_approved").notNull().default(false),
  executionMode: text("execution_mode").notNull().default("MANUAL"),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const executionRequestsTable = pgTable("execution_requests", {
  id: text("id").primaryKey(),
  signalId: text("signal_id").notNull(),
  userId: text("user_id").notNull(),
  brokerAccountId: text("broker_account_id"),
  environment: text("environment").notNull(),
  status: text("status").notNull().default("REQUESTED"),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  externalRequestId: text("external_request_id"),
  requestedPrice: numeric("requested_price", { precision: 18, scale: 8 }),
  executedPrice: numeric("executed_price", { precision: 18, scale: 8 }),
  volume: numeric("volume", { precision: 18, scale: 8 }),
  error: text("error"),
  requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const pipelineEventsTable = pgTable("pipeline_events", {
  id: text("id").primaryKey(),
  aggregateType: text("aggregate_type").notNull(),
  aggregateId: text("aggregate_id").notNull(),
  eventType: text("event_type").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const auditLogsTable = pgTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  actorType: text("actor_type").notNull(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  result: text("result").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const brokerAccountsTable = pgTable("broker_accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  platform: text("platform").notNull(),
  mode: text("mode").notNull(),
  status: text("status").notNull().default("DISCONNECTED"),
  metaApiAccountId: text("metaapi_account_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertIncomingMessageSchema = createInsertSchema(incomingMessagesTable).omit({
  createdAt: true,
});
export type InsertIncomingMessage = z.infer<typeof insertIncomingMessageSchema>;
export type IncomingMessage = typeof incomingMessagesTable.$inferSelect;
export type Signal = typeof signalsTable.$inferSelect;
export type SignalDecision = typeof signalDecisionsTable.$inferSelect;
export type ExecutionRequest = typeof executionRequestsTable.$inferSelect;