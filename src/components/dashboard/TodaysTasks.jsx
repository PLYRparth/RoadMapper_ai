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

            <div className="mb-8 rounded-xl border p-8 text-center">

                <h2 className="text-2xl font-semibold">

                    🎉

                    All roadmaps completed

                </h2>

            </div>

        )

    }

    return (

        <div className="mb-10">

            <h2 className="mb-6 text-2xl font-bold">

                Today's Tasks

            </h2>

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