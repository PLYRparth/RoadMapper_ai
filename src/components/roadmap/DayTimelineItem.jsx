import { motion } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
} from "lucide-react";

import { getDayStatus } from "../../utils/roadmap";
import { getAccentClasses } from "../../utils/accent";

const DayTimelineItem = ({
  roadmap,
  day,
  index,
  selectedDay,
  setSelectedDay,
}) => {
  const status = getDayStatus(roadmap, index);
  const isSelected = selectedDay.day === day.day;
  const accentClasses = getAccentClasses(roadmap.accent);

  const indicatorClasses = () => {
    if (status === "completed") {
      return `${accentClasses.border} ${accentClasses.bgSoft} ${accentClasses.text}`;
    }

    if (status === "current") {
      return `${accentClasses.borderStrong} ${accentClasses.bgSolid} text-white ${accentClasses.shadow}`;
    }

    return "border-white/[0.08] bg-white/[0.03] text-zinc-500";
  };

  const icon = () => {
    if (status === "completed") {
      return <CheckCircle2 size={17} />;
    }

    if (status === "current") {
      return <PlayCircle size={17} />;
    }

    return <Lock size={16} />;
  };

  return (
    <motion.button
      type="button"
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => setSelectedDay(day)}
      className={`w-full rounded-lg p-2.5 text-left transition-all duration-200 ${
        isSelected
          ? "bg-white text-black shadow-sm"
          : "text-zinc-300 hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${indicatorClasses()}`}
        >
          {icon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium">
              Day {day.day}
            </h3>

            <span className={`font-mono text-[11px] ${isSelected ? "text-black/55" : "text-zinc-500"}`}>
              {day.estimatedTime}
            </span>
          </div>

          <p className={`mt-1 line-clamp-2 text-xs leading-5 ${isSelected ? "text-black/70" : "text-zinc-400"}`}>
            {day.title}
          </p>

          <div className={`mt-1.5 flex gap-3 font-mono text-[11px] ${isSelected ? "text-black/55" : "text-zinc-500"}`}>
            <span>{day.tasks.length} tasks</span>
            <span>{day.focus.length} focus</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default DayTimelineItem;
