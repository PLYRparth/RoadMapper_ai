import Card from "../ui/Card";

import {
    calculateOverallProgress,
} from "../../utils/progress";
import ProgressBar from "../ui/ProgressBar";

const OverallProgress = ({
    roadmaps,
}) => {

    const stats =
        calculateOverallProgress(
            roadmaps
        );

    return (
        <Card className="mt-8">


            <ProgressBar
                value={stats.progress}
            />

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">

                <div>

                    <p className="text-3xl font-bold">

                        {stats.progress}%

                    </p>

                    <p className="mt-2 text-sm text-zinc-500">

                        Completed

                    </p>

                </div>

                <span>

                    {stats.completedTasks}

                    {" / "}

                    {stats.totalTasks}

                    {" Tasks"}

                </span>

                <span>

                    {roadmaps.length}

                    {" Active Roadmaps"}

                </span>

            </div>

        </Card>
    );
};

export default OverallProgress;