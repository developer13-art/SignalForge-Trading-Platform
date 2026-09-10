import React from 'react';
import { AreaChart } from '../ui/Chart';

interface EquityCurveProps {
  data: Array<{ timestamp: string; equity: number; balance: number }>;
  height?: number;
}

export function EquityCurve({ data, height = 300 }: EquityCurveProps) {
  return (
    <AreaChart
      data={data}
      xKey="timestamp"
      height={height}
      areas={[
        { dataKey: 'equity', color: '#6366f1', name: 'Equity' },
        { dataKey: 'balance', color: '#22c55e', name: 'Balance' },
      ]}
    />
  );
}