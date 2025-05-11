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
import { SubscriptionChartComponentPropsType } from '@/types/dashboard/component';

// Defining dummy data
const chartConfig = {
  price: {
    label: 'قیمت',
    color: '#F30F26',
  },
} satisfies ChartConfig;

// Creating and exporting SubscriptionChart as default
export default function SubscriptionChart({
  chart,
}: SubscriptionChartComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chart}
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
