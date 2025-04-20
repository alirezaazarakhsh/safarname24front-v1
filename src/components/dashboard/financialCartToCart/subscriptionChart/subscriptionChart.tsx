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
  { month: 'فروردین', price: 186 },
  { month: 'اردیبهشت', price: 305 },
  { month: 'خرداد', price: 237 },
  { month: 'تیر', price: 73 },
  { month: 'مرداد', price: 209 },
  { month: 'شهریور', price: 209 },
  { month: 'مهر', price: 186 },
  { month: 'ابان', price: 305 },
  { month: 'اذر', price: 237 },
  { month: 'دی', price: 73 },
  { month: 'بهمن', price: 209 },
  { month: 'اسفند', price: 209 },
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
    <ChartContainer config={chartConfig} className="h-[70%]">
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
