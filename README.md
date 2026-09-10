# README.md
# SignalForge AI

Enterprise Trading Intelligence Platform

## Overview

SignalForge AI is a production-grade multi-user SaaS trading signal intelligence and automation platform. It receives trading messages from connected external sources, detects and normalizes potential trading signals, uses AI and Provider DNA to understand and analyze them, validates signal quality, and applies each user's individual trading rules and risk controls before execution.

## Features

- **Multi-Source Signal Ingestion**: Telegram, Discord, WhatsApp, Email, TradingView, REST API
- **AI Signal Intelligence**: Message classification, signal extraction, normalization, confidence scoring
- **Provider DNA**: Learned provider patterns for fast, reliable signal parsing
- **Risk Engine**: Configurable risk controls and validation
- **Automated Execution**: MetaApi integration for MT4/MT5
- **Copy Trading**: Fan-out architecture for subscriber-specific execution
- **Analytics**: Performance tracking, equity curves, drawdown analysis
- **Marketplace**: Provider discovery and subscription
- **Referral System**: Platform-funded referral rewards
- **KYC**: Mandatory identity verification
- **Admin Console**: Full platform management

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express + TypeScript
- **Database**: PostgreSQL + Prisma
- **Cache/Queue**: Redis + BullMQ
- **Real-time**: WebSockets
- **AI**: Anthropic Claude (with OpenAI support)
- **Payments**: Paystack (Stripe-ready)
- **Broker**: MetaApi (MT4/MT5)

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker and Docker Compose
- PostgreSQL 16
- Redis 7

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/signalforge.git
cd signalforge

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start infrastructure
docker-compose up -d

# Run database migrations
pnpm db:migrate

# Start development servers
pnpm dev
\`\`\`

## Project Structure

\`\`\`
signalforge/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Express backend
├── packages/
│   ├── database/     # Prisma schema and client
│   ├── shared/       # Shared types and constants
│   ├── ui/           # Reusable UI components
│   ├── config/       # Permissions and roles
│   └── logger/       # Logging utility
├── infrastructure/   # Docker, nginx, monitoring
├── tests/            # Test suites
└── scripts/          # Utility scripts
\`\`\`

## License

Proprietary - All rights reserved

# SignalForge AI - Complete Platform

Enterprise-grade trading signal intelligence and automation platform.

## Quick Start

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose

### Development Setup

```bash
# Install dependencies
pnpm install

# Copy environment
cp .env.example .env

# Start infrastructure
docker-compose up -d postgres redis

# Run migrations
pnpm --filter @signalforge/database db:migrate

# Start API
pnpm --filter @signalforge/api dev

# Start Web (in another terminal)
pnpm --filter @signalforge/web dev

# Start Workers (in another terminal)
pnpm --filter @signalforge/api worker