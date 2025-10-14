import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapDay {
  date: string;
  count: number;
}

export const ActivityHeatmap = () => {
  const { getHeatmapData } = useProgress();
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeatmapData(currentYear, currentMonth);
      setHeatmapData(data);
    };
    fetchData();
  }, [currentMonth, currentYear]);

  const getDaysInMonth = () => {
    const days = new Date(currentYear, currentMonth, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const getCountForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const found = heatmapData.find((d) => d.date === dateStr);
    return found ? found.count : 0;
  };

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-green-200 dark:bg-green-900";
    if (count <= 4) return "bg-green-400 dark:bg-green-700";
    return "bg-green-600 dark:bg-green-500";
  };

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Activity - {monthName} {currentYear}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth().map((day) => {
          const count = getCountForDay(day);
          return (
            <TooltipProvider key={day}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`aspect-square rounded ${getColorClass(count)} flex items-center justify-center text-xs font-medium transition-all hover:scale-110`}
                  >
                    {day}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {count === 0
                      ? "No activity"
                      : `${count} level${count > 1 ? "s" : ""} completed`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {monthName} {day}, {currentYear}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-muted rounded" />
          <div className="w-4 h-4 bg-green-200 dark:bg-green-900 rounded" />
          <div className="w-4 h-4 bg-green-400 dark:bg-green-700 rounded" />
          <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
