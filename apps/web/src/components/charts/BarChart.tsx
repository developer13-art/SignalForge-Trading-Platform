import React from 'react';
import { BarChart as ReBarChart } from '../ui/Chart';

interface BarChartProps {
  data: any[];
  xKey: string;
  dataKey: string;
  name?: string;
  color?: string;
  height?: number;
}

export function BarChart({ data, xKey, dataKey, name, color, height }: BarChartProps) {
  return (
    <ReBarChart
      data={data}
      xKey={xKey}
      height={height}
      bars={[{ dataKey, color, name }]}
    />
  );
}