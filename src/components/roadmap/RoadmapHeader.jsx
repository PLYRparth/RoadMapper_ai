import { calculateRoadmapProgress } from "../../utils/progress";
import ProgressBar from "../ui/ProgressBar";
import { getAccentClasses } from "../../utils/accent";

const RoadmapHeader = ({ roadmap }) => {
  const progress = calculateRoadmapProgress(roadmap);
  const accentClasses = getAccentClasses(roadmap.accent);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${accentClasses.dot}`} />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Roadmap
            </p>
          </div>

          <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-3xl">
            {roadmap.goal}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Day {roadmap.currentDayIndex + 1} of {roadmap.duration}
          </p>
        </div>

        <div className="min-w-full lg:min-w-80">
          <div className="mb-2 flex justify-between font-mono text-xs text-zinc-500">
            <span>Overall progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} height="h-2.5" showPercentage={false} />
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;
