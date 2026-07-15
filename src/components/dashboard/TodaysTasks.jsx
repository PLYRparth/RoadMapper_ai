import Card from "../ui/Card";
import RoadmapTaskGroup from "./RoadmapTaskGroup";

const TodaysTasks = ({
  roadmaps,
  refresh,
}) => {
  const activeRoadmaps = roadmaps.filter((roadmap) => !roadmap.isCompleted);

  if (activeRoadmaps.length === 0) {
    return (
      <Card padding="xl" className="text-center" hover={false}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          Done
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white">
          All roadmaps completed
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
          Great work. Start another roadmap whenever you are ready.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {activeRoadmaps.map((roadmap) => (
        <RoadmapTaskGroup
          key={roadmap.id}
          roadmap={roadmap}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default TodaysTasks;
