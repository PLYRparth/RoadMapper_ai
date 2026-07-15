import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ChevronRight,
  MoreVertical,
  Trash2,
  Archive,
  Play,
} from "lucide-react";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { calculateRoadmapProgress } from "../../utils/progress";
import { archiveRoadmap, deleteRoadmap } from "../../utils/storage";
import { getAccentClasses } from "../../utils/accent";

const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const accentClasses = getAccentClasses(roadmap.accent);

  const progress = calculateRoadmapProgress(roadmap);
  const currentDay = roadmap.currentDayIndex + 1;
  const remainingDays = roadmap.duration - roadmap.currentDayIndex;
  const currentDayData = roadmap.days[roadmap.currentDayIndex];

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card
        onClick={() => navigate(`/roadmap/${roadmap.id}`)}
        className="group relative h-full cursor-pointer overflow-hidden"
      >
        <div className={`absolute inset-y-0 left-0 w-0.1 border border-zinc-500/50 `} />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
          aria-label="Open roadmap actions"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 top-14 z-20 w-48 overflow-hidden rounded-lg border border-white/[0.1] bg-[#18181b] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:bg-white/[0.06]"
            >
              <Play size={16} />
              Open Roadmap
            </button>

            <button
              onClick={() => {
                archiveRoadmap(roadmap.id);
                window.location.reload();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:bg-white/[0.06]"
            >
              <Archive size={16} />
              Archive
            </button>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(`Delete "${roadmap.goal}"?`);

                if (!confirmDelete) return;

                deleteRoadmap(roadmap.id);
                window.location.reload();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}

        <div className="pr-10 pl-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Roadmap
          </p>

          <div className="mt-2 flex items-start gap-2">
            <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentClasses.dot}`} />
            <h2 className="line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-white">
              {roadmap.goal}
            </h2>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-400">
            {currentDayData?.title}
          </p>
        </div>

        <div className="mt-6 pl-1">
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} height="h-2" showPercentage={false} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 pl-1">
          <div className={`rounded-lg border bg-white/[0.025] p-3 ${accentClasses.border} ${accentClasses.bgSoft}`}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${accentClasses.text}`}>
              Current day
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {currentDay} / {roadmap.duration}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              Remaining
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {remainingDays} days
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end text-zinc-500 transition-colors duration-200 group-hover:text-white">
          <ChevronRight size={20} />
        </div>
      </Card>
    </motion.div>
  );
};

export default RoadmapCard;
