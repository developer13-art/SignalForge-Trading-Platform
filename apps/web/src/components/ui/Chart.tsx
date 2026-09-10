import React from 'react';
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  BarChart as ReBarChart,
  AreaChart as ReAreaChart,
  PieChart as RePieChart,
  Line,
  Bar,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface ChartContainerProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
}

export function ChartContainer({ children, height = 300, className }: ChartContainerProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer>{children as any}</ResponsiveContainer>
    </div>
  );
}

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

export interface LineChartProps {
  data: any[];
  xKey: string;
  lines: Array<{ dataKey: string; color?: string; name?: string }>;
  height?: number;
}

export function LineChart({ data, xKey, lines, height }: LineChartProps) {
  return (
    <ChartContainer height={height}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
        <XAxis dataKey={xKey} stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            border: 'none',
            borderRadius: '8px',
            color: '#f9fafb',
          }}
        />
        <Legend />
        {lines.map((line, i) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color || COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
            name={line.name || line.dataKey}
          />
        ))}
      </ReLineChart>
    </ChartContainer>
  );
}

export interface BarChartProps {
  data: any[];
  xKey: string;
  bars: Array<{ dataKey: string; color?: string; name?: string }>;
  height?: number;
}

export function BarChart({ data, xKey, bars, height }: BarChartProps) {
  return (
    <ChartContainer height={height}>
      <ReBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
        <XAxis dataKey={xKey} stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            border: 'none',
            borderRadius: '8px',
            color: '#f9fafb',
          }}
        />
        <Legend />
        {bars.map((bar, i) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color || COLORS[i % COLORS.length]}
            name={bar.name || bar.dataKey}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </ReBarChart>
    </ChartContainer>
  );
}

export interface AreaChartProps {
  data: any[];
  xKey: string;
  areas: Array<{ dataKey: string; color?: string; name?: string }>;
  height?: number;
}

export function AreaChart({ data, xKey, areas, height }: AreaChartProps) {
  return (
    <ChartContainer height={height}>
      <ReAreaChart data={data}>
        <defs>
          {areas.map((area, i) => {
            const color = area.color || COLORS[i % COLORS.length];
            return (
              <linearGradient key={area.dataKey} id={`grad-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
        <XAxis dataKey={xKey} stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            border: 'none',
            borderRadius: '8px',
            color: '#f9fafb',
          }}
        />
        {areas.map((area, i) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            stroke={area.color || COLORS[i % COLORS.length]}
            fill={`url(#grad-${area.dataKey})`}
            strokeWidth={2}
            name={area.name || area.dataKey}
          />
        ))}
      </ReAreaChart>
    </ChartContainer>
  );
}

export interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
}

export function PieChart({ data, height }: PieChartProps) {
  return (
    <ChartContainer height={height}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => `${entry.name}: ${entry.value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ChartContainer>
  );
}