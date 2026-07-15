import Card from "../ui/Card";
import RoadmapTaskGroup from "./RoadmapTaskGroup";

const TodaysTasks = ({
    roadmaps,
    refresh,
}) => {

    const activeRoadmaps =
        roadmaps.filter(
            roadmap => !roadmap.isCompleted
        );

    if (activeRoadmaps.length === 0) {

        return (

            <Card
                padding="xl"
                className="text-center"
            >

                <div className="text-5xl">

                    🎉

                </div>

                <h2 className="mt-6 text-3xl font-semibold">

                    All roadmaps completed

                </h2>

                <p className="mt-3 text-zinc-400">

                    Great work! Start another roadmap whenever you're ready.

                </p>

            </Card>

        )

    }

    return (

        <div className="space-y-8">

            {

                activeRoadmaps.map(

                    roadmap => (

                        <RoadmapTaskGroup

                            key={roadmap.id}

                            roadmap={roadmap}

                            refresh={refresh}

                        />

                    )

                )

            }

        </div>

    );

};

export default TodaysTasks;