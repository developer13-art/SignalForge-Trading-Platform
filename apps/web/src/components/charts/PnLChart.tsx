import React from 'react';
import { BarChart } from '../ui/Chart';

interface PnLChartProps {
  data: Array<{ date: string; pnl: number }>;
  height?: number;
}

export function PnLChart({ data, height = 300 }: PnLChartProps) {
  return (
    <BarChart
      data={data}
      xKey="date"
      height={height}
      bars={[{ dataKey: 'pnl', color: '#22c55e', name: 'Daily P&L' }]}
    />
  );
}