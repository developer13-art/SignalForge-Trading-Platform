import React from 'react';

export interface ChartProps {
  children: React.ReactNode;
  height?: number;
}

export function Chart({ children, height = 300 }: ChartProps) {
  return <div style={{ height, width: '100%' }}>{children}</div>;
}