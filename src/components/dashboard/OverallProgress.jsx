import Card from "../ui/Card";
import { calculateOverallProgress } from "../../utils/progress";
import ProgressBar from "../ui/ProgressBar";

const OverallProgress = ({ roadmaps }) => {
  const stats = calculateOverallProgress(roadmaps);

  return (
    <Card className="xl:sticky xl:top-24" hover={false}>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Completion
          </p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] text-white">
            {stats.progress}%
          </p>
        </div>

        <div className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 font-mono text-xs text-zinc-400">
          Live
        </div>
      </div>

      <div className="mt-6">
        <ProgressBar value={stats.progress} height="h-2.5" showPercentage={false} />
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            Tasks
          </p>
          <p className="mt-1.5 text-base font-semibold text-white">
            {stats.completedTasks} / {stats.totalTasks}
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            Active roadmaps
          </p>
          <p className="mt-1.5 text-base font-semibold text-white">
            {roadmaps.length}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OverallProgress;

