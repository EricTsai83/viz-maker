"use client";

import { useRef } from "react";
import { TimelineHorizontal } from "@/components/timeline-horizontal";
import { downloadTimelineImage } from "@/lib/utils";

export default function TimelinePage() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  async function handleDownload() {
    await downloadTimelineImage(timelineRef);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={timelineRef}
        style={{ backgroundColor: "transparent" }}
        className="p-4"
      >
        <TimelineHorizontal />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        下載 Timeline 圖片
      </button>
    </div>
  );
}
