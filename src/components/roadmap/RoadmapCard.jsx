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

import {
  calculateRoadmapProgress,
} from "../../utils/progress";

import {
  archiveRoadmap,
  deleteRoadmap,
} from "../../utils/storage";

const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const progress =
    calculateRoadmapProgress(roadmap);

  const currentDay =
    roadmap.currentDayIndex + 1;

  const remainingDays =
    roadmap.duration -
    roadmap.currentDayIndex;

  const currentDayData =
    roadmap.days[roadmap.currentDayIndex];

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Card
        onClick={() =>
          navigate(`/roadmap/${roadmap.id}`)
        }
        className="relative cursor-pointer"
      >
        {/* Menu */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="absolute right-5 top-5 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="absolute right-5 top-14 z-20 w-48 overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181B] shadow-2xl"
          >
            <button
              onClick={() =>
                navigate(
                  `/roadmap/${roadmap.id}`
                )
              }
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
            >
              <Play size={16} />
              Open Roadmap
            </button>

            <button
              onClick={() => {
                archiveRoadmap(
                  roadmap.id
                );

                window.location.reload();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
            >
              <Archive size={16} />
              Archive
            </button>

            <button
              onClick={() => {
                const confirmDelete =
                  window.confirm(
                    `Delete "${roadmap.goal}"?`
                  );

                if (!confirmDelete)
                  return;

                deleteRoadmap(
                  roadmap.id
                );

                window.location.reload();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}

        {/* Header */}

        <div className="mb-6 pr-10">

          <h2 className="text-xl font-semibold text-white">
            {roadmap.goal}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            {currentDayData?.title}
          </p>

        </div>

        {/* Progress */}

        <div className="mb-6">

          <ProgressBar
            value={progress}
          />

        </div>

        {/* Stats */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Current Day
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {currentDay} / {roadmap.duration}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Remaining
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {remainingDays} Days
            </p>

          </div>

        </div>

        {/* Footer */}

        <motion.div
          whileHover={{
            x: 5,
          }}
          className="mt-6 flex justify-end text-zinc-500"
        >
          <ChevronRight size={22} />
        </motion.div>

      </Card>
    </motion.div>
  );
};

export default RoadmapCard;