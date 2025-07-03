"use client";

import React, { useRef } from "react";
import { GanttChart, GanttTask } from "@/components/gantt-chart"; // 調整引入路徑
import { cn, downloadTimelineImage } from "@/lib/utils";

// 模擬一些資料
const tasks: GanttTask[] = [
  {
    id: "1",
    name: "專案規劃",
    startDate: "2024-01-01",
    endDate: "2024-01-10",
    progress: 100,
    color: "#4CAF50",
  },
  {
    id: "2",
    name: "需求分析",
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    progress: 100,
    color: "#2196F3",
    dependencies: ["1"],
  },
  {
    id: "3",
    name: "系統設計",
    startDate: "2024-01-15",
    endDate: "2024-02-05",
    progress: 80,
    color: "#FF5722",
    dependencies: ["2"],
  },
  {
    id: "4",
    name: "前端開發",
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    progress: 60,
    color: "#9C27B0",
    dependencies: ["3"],
  },
  {
    id: "5",
    name: "後端開發",
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    progress: 65,
    color: "#FF9800",
    dependencies: ["3"],
  },
  {
    id: "6",
    name: "單元測試",
    startDate: "2024-02-15",
    endDate: "2024-03-05",
    progress: 30,
    color: "#795548",
    dependencies: ["4", "5"],
  },
  {
    id: "7",
    name: "整合測試",
    startDate: "2024-02-25",
    endDate: "2024-03-15",
    progress: 20,
    color: "#607D8B",
    dependencies: ["6"],
  },
  {
    id: "8",
    name: "使用者測試",
    startDate: "2024-03-10",
    endDate: "2024-03-25",
    progress: 0,
    color: "#F44336",
    dependencies: ["7"],
  },
  {
    id: "9",
    name: "部署上線",
    startDate: "2024-03-20",
    endDate: "2024-03-30",
    progress: 0,
    color: "#009688",
    dependencies: ["8"],
  },
];

export default function GanttChartPage() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  async function handleDownload() {
    await downloadTimelineImage(chartRef);
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div
        ref={chartRef}
        className={cn("w-full", "dark:bg-gray-800 rounded-xl p-4")}
        style={{ backgroundColor: "transparent" }}
      >
        <GanttChart tasks={tasks} />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        下載 Gantt 圖片
      </button>
    </div>
  );
}
