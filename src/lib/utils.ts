import { clsx, type ClassValue } from "clsx";
import html2canvas from "html2canvas-pro";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadTimelineImage(
  ref: React.RefObject<HTMLDivElement | null>,
) {
  if (ref.current) {
    try {
      const canvas = await html2canvas(ref.current, {
        backgroundColor: null,
        scale: window.devicePixelRatio,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "timeline.png";
      link.click();
    } catch (error) {
      console.error("截圖錯誤", error);
    }
  }
}
