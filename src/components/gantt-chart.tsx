"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { format, parseISO, differenceInDays } from "date-fns";

import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  color?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  startDate?: string;
  endDate?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBar = (props: any) => {
  const { x, y, width, height, payload, color } = props;
  // 使用 payload 來獲取完整的資料物件
  const adjustedX = x + (payload.startPosition * width) / payload.duration;

  return (
    <g>
      <Rectangle
        x={adjustedX}
        y={y}
        width={width}
        height={height}
        fill={color || "var(--color-task)"}
        radius={4}
      />
      <Rectangle
        x={adjustedX}
        y={y}
        width={width * (payload.progress / 100)}
        height={height}
        fill={color ? `${color}dd` : "var(--color-progress)"}
        radius={[4, 0, 0, 4]}
      />
    </g>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {format(parseISO(data.startDate), "MMM d, yyyy")} -{" "}
          {format(parseISO(data.endDate), "MMM d, yyyy")}
        </p>
        <p className="text-sm">Progress: {data.progress}%</p>
      </div>
    );
  }
  return null;
};

export function GanttChart({
  tasks,
  startDate,
  endDate,
  className,
}: GanttChartProps) {
  // Calculate the overall date range if not provided
  const effectiveStartDate = startDate
    ? parseISO(startDate)
    : tasks.reduce((min, task) => {
        const date = parseISO(task.startDate);
        return date < min ? date : min;
      }, parseISO(tasks[0].startDate));

  const effectiveEndDate = endDate
    ? parseISO(endDate)
    : tasks.reduce((max, task) => {
        const date = parseISO(task.endDate);
        return date > max ? date : max;
      }, parseISO(tasks[0].endDate));

  // Transform tasks for the chart
  const chartData = tasks.map((task) => {
    const start = parseISO(task.startDate);
    const end = parseISO(task.endDate);

    return {
      ...task,
      startPosition: differenceInDays(start, effectiveStartDate),
      duration: differenceInDays(end, start) + 1, // +1 to include the end day
    };
  });

  // Generate date ticks for the x-axis
  const totalDays = differenceInDays(effectiveEndDate, effectiveStartDate) + 1;
  const dateTicks = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(effectiveStartDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Config for the chart
  const chartConfig = {
    task: {
      label: "Task",
      color: "hsl(var(--chart-1))",
    },
    progress: {
      label: "Progress",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("min-h-[400px] w-full", className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          barSize={20}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, totalDays]}
            tickFormatter={(value) => {
              if (
                Number.isInteger(value) &&
                value >= 0 &&
                value < dateTicks.length
              ) {
                return format(dateTicks[value], "MMM d");
              }
              return "";
            }}
            ticks={Array.from({ length: Math.min(10, totalDays) }, (_, i) =>
              Math.floor(i * (totalDays / Math.min(10, totalDays))),
            )}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="duration"
            shape={<CustomBar />}
            background={{ fill: "#eee" }}
            radius={4}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
