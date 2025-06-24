import React from 'react';
import { Area, AreaChart, XAxis, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const data = [
  { name: 'Jan', sales: 500, orders: 1040, revenue: 2400 },
  { name: 'Feb', sales: 300, orders: 1039, revenue: 1390 },
  { name: 'Mar', sales: 2000, orders: 7000, revenue: 9800 },
  { name: 'Apr', sales: 278, orders: 2000, revenue: 3900 },
  { name: 'May', sales: 189, orders: 480, revenue: 4800 },
  { name: 'Jun', sales: 239, orders: 380, revenue: 3800 },
];

const chartConfig = {
  month: {
    label: "Month",
  },
  sales: {
    label: "sales",
    color: "var(--chart-1)",
  },
  orders: {
    label: "orders",
    color: "var(--chart-2)",
  },
  revenue: {
    label: "revenue",
    color: "var(--chart-2)",
  },
};


const Graph = ({ title, description, data }) => {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={title.toLowerCase()}
              type="natural"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.3}
              style={{ mixBlendMode: 'multiply' }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Graph; 
