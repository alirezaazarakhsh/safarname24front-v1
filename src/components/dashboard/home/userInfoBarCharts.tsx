// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Bar, BarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import moment from 'jalali-moment';
import { ReactNode, useState } from 'react';

// Defining dummy data to render
const chartData = [
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 12 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 3 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 6 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 5 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 13 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 6 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 5 },
  { date: moment().locale('fa').format('YYYY/MM/DD'), value: 2 },
];

// Defining configs of charts
const chartConfig = {
  value: {
    label: 'lrnh : ',
  },
} satisfies ChartConfig;

// Creating and exporting UserInfoButtonChart component as default
export function UserInfoBarChart(): ReactNode {
  // Defining state of component
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPosX, setCursorPosX] = useState<number>(0);

  // Returning JSX
  return (
    <ChartContainer
      style={{ position: 'relative' }}
      onMouseLeave={() => setCursorPosX(0)}
      onMouseMove={(e) => {
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const posXToSet = e.clientX - boundingRect.left - 30;

        setCursorPosX(posXToSet);
      }}
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={chartData} barGap={10}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent posX={cursorPosX} hideLabel />}
        />

<Bar
  dataKey="value"
  onMouseEnter={(item, index) => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  shape={({ x, y, height, index }: any) => (
    <g>
      {/* Invisible Hitbox for Better Hover Detection */}
      <rect
        x={x - 7}  // Expand left & right
        y={y - 5}  // Expand up
        width={17} // Expand hitbox width
        height={height + 10} // Expand hitbox height
        fill="transparent"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      />
      
      {/* Actual Bar */}
      <rect
        x={x}
        y={y}
        ry={3}
        width={3}
        height={height}
        fill="#35A346"
        style={{
          transition: 'all 500ms ease-out',
          opacity: index === hoveredIndex ? '20%' : '100%',
        }}
      />
    </g>
  )}
/>
      </BarChart>
    </ChartContainer>
  );
}
