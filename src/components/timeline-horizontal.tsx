"use client";

import {
  Users,
  FileText,
  Palette,
  Code2,
  TestTube2,
  Rocket,
} from "lucide-react";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

const timelineData = [
  {
    title: "需求訪談",
    description: "2024年1月1日 - 1月5日",
    icon: Users,
    position: "before:flex-1",
    reverse: false,
  },
  {
    title: "規格制定",
    description: "2024年1月8日 - 1月12日",
    icon: FileText,
    position: "after:flex-1",
    reverse: true,
  },
  {
    title: "UI/UX設計",
    description: "2024年1月15日 - 1月26日",
    icon: Palette,
    position: "before:flex-1",
    reverse: false,
  },
  {
    title: "前後端開發",
    description: "2024年2月1日 - 2月23日",
    icon: Code2,
    position: "after:flex-1",
    reverse: true,
  },
  {
    title: "測試階段",
    description: "2024年2月26日 - 3月8日",
    icon: TestTube2,
    position: "after:flex-1",
    reverse: true,
  },
  {
    title: "正式上線",
    description: "2024年3月15日",
    icon: Rocket,
    position: "before:flex-1",
    reverse: false,
  },
];

export function TimelineHorizontal() {
  return (
    <Timeline orientation="horizontal" className="min-h-40">
      {timelineData.map((item, index) => (
        <TimelineItem key={index} className={item.position}>
          {item.reverse ? (
            <>
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineDescription className="whitespace-nowrap">
                  {item.description}
                </TimelineDescription>
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot>
                  <item.icon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
            </>
          ) : (
            <>
              <TimelineSeparator>
                <TimelineDot>
                  <item.icon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineDescription className="whitespace-nowrap">
                  {item.description}
                </TimelineDescription>
              </TimelineContent>
            </>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
