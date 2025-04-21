// Forcing next.js to render this component as client side component
'use client';

// IMporting part
import { Area, AreaChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { ReactNode } from 'react';
import Tooltip from './tooltip';

// Defining dummy data
const chartData = [
  { month: 'فروردین', price: 180000 },
  { month: 'اردیبهشت', price: 120000 },
  { month: 'خرداد', price: 250000 },
  { month: 'تیر', price: 80000 },
  { month: 'مرداد', price: 220000 },
  { month: 'شهریور', price: 220000 },
  { month: 'مهر', price: 190000 },
  { month: 'ابان', price: 190000 },
  { month: 'اذر', price: 250000 },
  { month: 'دی', price: 14000 },
  { month: 'بهمن', price: 220000 },
  { month: 'اسفند', price: 220000 },
];

const chartConfig = {
  price: {
    label: 'قیمت',
    color: '#F30F26',
  },
} satisfies ChartConfig;

// Creating and exporting SubscriptionChart as default
export default function SubscriptionChart(): ReactNode {
  // Returning JSX
  return (
    <ChartContainer config={chartConfig} className="h-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <ChartTooltip cursor={false} content={<Tooltip />} />
        <defs>
          <linearGradient id="fillSubscription" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FE6C6C" stopOpacity={1} />
            <stop offset="100%" stopColor="#FE6C6C" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="price"
          type="natural"
          fill="url(#fillSubscription)"
          fillOpacity={0.3}
          stroke="#F30F26"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
