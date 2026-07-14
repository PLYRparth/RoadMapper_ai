import {
  calculateRoadmapProgress,
} from "../../utils/progress";

const RoadmapHeader = ({
  roadmap,
}) => {

  const progress =
    calculateRoadmapProgress(
      roadmap
    );

  return (

    <div className="mb-8">

      <h1 className="text-4xl font-bold">

        {roadmap.goal}

      </h1>

      <p className="mt-2 text-neutral-500">

        Day

        {" "}

        {roadmap.currentDayIndex+1}

        {" / "}

        {roadmap.duration}

      </p>

      <div className="mt-5 h-3 rounded-full bg-neutral-200">

        <div

          className="h-full rounded-full bg-black"

          style={{

            width:`${progress}%`

          }}

        />

      </div>

    </div>

  );

};

export default RoadmapHeader;