import React from 'react';
import { PieChart as RePieChart } from '../ui/Chart';

interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
}

export function PieChart({ data, height }: PieChartProps) {
  return <RePieChart data={data} height={height} />;
}