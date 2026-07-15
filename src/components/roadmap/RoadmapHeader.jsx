import {
    calculateRoadmapProgress,
} from "../../utils/progress";

import ProgressBar from "../ui/ProgressBar";

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

                {roadmap.currentDayIndex + 1}

                {" / "}

                {roadmap.duration}

            </p>

            <ProgressBar
                value={progress}
            />

        </div>

    );

};

export default RoadmapHeader;