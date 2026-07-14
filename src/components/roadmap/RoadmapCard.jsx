import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import Card from "../ui/Card";

import {
    calculateRoadmapProgress,
} from "../../utils/progress";

const RoadmapCard = ({ roadmap }) => {
    const navigate = useNavigate();

    const progress =
        calculateRoadmapProgress(roadmap);

    const currentDay =
        roadmap.currentDayIndex + 1;

    const remainingDays =
        roadmap.duration - roadmap.currentDayIndex;

    return (
        <motion.div
            whileHover={{
                y: -4,
                transition: {
                    duration: 0.2,
                },
            }}
            whileTap={{
                scale: 0.99,
            }}
        >
            <Card
                onClick={() =>
                    navigate(`/roadmap/${roadmap.id}`)
                }
                className="cursor-pointer transition-shadow hover:shadow-xl"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {roadmap.goal}
                    </h2>

                    <motion.div
                        whileHover={{
                            x: 5,
                        }}
                    >
                        <ChevronRight />
                    </motion.div>
                </div>

                <div className="mb-5">
                    <div className="mb-2 flex justify-between text-sm text-neutral-500">
                        <span>Progress</span>

                        <span>{progress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                        <motion.div
                            className="h-full rounded-full bg-black"
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: `${progress}%`,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-between text-sm text-neutral-500">
                    <div>
                        <p>Current Day</p>

                        <p className="mt-1 font-medium text-black">
                            {currentDay} / {roadmap.duration}
                        </p>
                    </div>

                    <div className="text-right">
                        <p>Remaining</p>

                        <p className="mt-1 font-medium text-black">
                            {remainingDays} Days
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default RoadmapCard;