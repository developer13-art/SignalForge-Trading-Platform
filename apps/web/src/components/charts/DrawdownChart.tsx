import React from 'react';
import { AreaChart } from '../ui/Chart';

interface DrawdownChartProps {
  data: Array<{ date: string; drawdown: number }>;
  height?: number;
}

export function DrawdownChart({ data, height = 300 }: DrawdownChartProps) {
  return (
    <AreaChart
      data={data}
      xKey="date"
      height={height}
      areas={[{ dataKey: 'drawdown', color: '#ef4444', name: 'Drawdown %' }]}
    />
  );
}