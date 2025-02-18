// Forcing next.js to render this component as client side component
"use client"

// Importing part
import { Bar, BarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import moment from "jalali-moment"

const chartData = [
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 12 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 3 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 6 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 5 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 13 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 6 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 5 },
  { date: moment().locale('fa').format("YYYY/MM/DD"), value: 2 },
]

// Defining configs of charts
const chartConfig = {
  value: {
    label: "مقدار",
  },
} satisfies ChartConfig

// Creating and exporting UserInfoButtonChart component as default
export function UserInfoBarChart() {
    // Returning JSX
  return (
<ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} barGap={10}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#35A346" radius={200} maxBarSize={4} />
          </BarChart>
        </ChartContainer>
  )
}

