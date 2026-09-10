import React from 'react';
import { Card } from '../../components/ui/Card';

export function TradingCalendar() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Calendar</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Daily P&L heatmap
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {now.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
          {blanks.map((i) => <div key={`blank-${i}`} />)}
          {days.map((day) => (
            <div
              key={day}
              className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {day}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}