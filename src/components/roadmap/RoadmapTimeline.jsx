import DayTimelineItem from "./DayTimelineItem";

const RoadmapTimeline = ({
  roadmap,
  selectedDay,
  setSelectedDay,
}) => {
  if (!roadmap || !roadmap.days) {
    return null;
  }

  return (
    <aside className="rounded-xl border border-white/[0.08] bg-[#111113] p-2.5 shadow-[0_1px_1px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="px-3 py-2.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          Timeline
        </p>
        <h2 className="mt-1.5 text-base font-semibold tracking-[-0.025em] text-white">
          {roadmap.duration} days
        </h2>
      </div>

      <div className="mt-2 space-y-1">
        {roadmap.days.map((day, index) => (
          <DayTimelineItem
            key={day.day}
            roadmap={roadmap}
            day={day}
            index={index}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        ))}
      </div>
    </aside>
  );
};

export default RoadmapTimeline;

