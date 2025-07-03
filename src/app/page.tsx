import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🛠️ VizMaker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mt-2">
            <Link href="/timeline" className="inline-block">
              <button className="w-full rounded-md bg-primary text-primary-foreground py-2 px-4 font-medium shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Timeline
              </button>
            </Link>
            <Link href="/gantt-chart" className="inline-block">
              <button className="w-full rounded-md bg-primary text-primary-foreground py-2 px-4 font-medium shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Gantt Chart
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-muted-foreground text-xs text-center">
        © {new Date().getFullYear()} Eric Tsai
      </div>
    </div>
  );
}
