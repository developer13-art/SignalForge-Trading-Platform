import React from 'react';

export function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">About SignalForge AI</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            SignalForge AI is an enterprise-grade trading intelligence platform built for traders, signal providers, and brokers who need more than a simple copy-trading tool.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            To bridge the gap between raw trading signals and intelligent execution by combining advanced AI, per-user risk controls, and enterprise-grade infrastructure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">What Makes Us Different</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• SignalForge is not a Telegram copier — it is a signal intelligence platform.</li>
            <li>• We own the data — positions, trades, and analytics live in our database.</li>
            <li>• One signal, many personalized orders — every subscriber gets their own risk-based execution.</li>
            <li>• Full auditability — every trade and reward backed by an immutable ledger.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}