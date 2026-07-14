import Card from "../ui/Card";
import {
    calculateOverallProgress,
} from "../../utils/progress";

const OverallProgress = ({roadmaps,}) => {

    const stats =
        calculateOverallProgress(
            roadmaps
        );

    return (
        <Card className="mb-8">

            <h2 className="mb-6 text-xl font-semibold">

                Overall Progress

            </h2>

            <div className="mb-4 h-3 rounded-full bg-neutral-200">

                <div
                    className="h-3 rounded-full bg-black"
                    style={{
                        width: `${stats.progress}%`,
                    }}
                />

            </div>

            <div className="flex justify-between text-sm">

                <span>

                    {stats.progress}%

                </span>

                <span>

                    {stats.completedTasks}

                    {" / "}

                    {stats.totalTasks}

                    {" Tasks"}

                </span>

            </div>

        </Card>
    );
};

export default OverallProgress;