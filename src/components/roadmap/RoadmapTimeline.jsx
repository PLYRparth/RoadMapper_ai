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
    <div className="space-y-4">
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
  );
};

export default RoadmapTimeline;