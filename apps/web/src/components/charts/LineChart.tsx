import React from 'react';
import { LineChart as ReLineChart } from '../ui/Chart';

interface LineChartProps {
  data: any[];
  xKey: string;
  lines: Array<{ dataKey: string; color?: string; name?: string }>;
  height?: number;
}

export function LineChart({ data, xKey, lines, height }: LineChartProps) {
  return <ReLineChart data={data} xKey={xKey} lines={lines} height={height} />;
}