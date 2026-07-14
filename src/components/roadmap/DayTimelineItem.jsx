import { motion } from "framer-motion";
import {
    CheckCircle2,
    Lock,
    PlayCircle,
} from "lucide-react";

import { getDayStatus } from "../../utils/roadmap";

const DayTimelineItem = ({
    roadmap,
    day,
    index,
    selectedDay,
    setSelectedDay,
}) => {

    console.log("Roadmap:", roadmap);
    console.log("Index:", index);
    console.log("Days:", roadmap.days);

    const status = getDayStatus(
        roadmap,
        index
    );

    const icon = () => {

        if (status === "completed")
            return (
                <CheckCircle2
                    className="text-green-500"
                    size={22}
                />
            );

        if (status === "current")
            return (
                <PlayCircle
                    className="text-blue-500"
                    size={22}
                />
            );

        return (
            <Lock
                className="text-neutral-400"
                size={20}
            />
        );

    };

    return (

        <motion.div

            whileHover={{
                scale: 1.02
            }}

            whileTap={{
                scale: 0.99
            }}

            onClick={() =>
                setSelectedDay(day)
            }

            className={`cursor-pointer rounded-xl border p-4 transition-all

      ${selectedDay.day === day.day

                    ? "border-black shadow-md"

                    : "border-neutral-200"

                }

      `}

        >

            <div className="flex items-start gap-4">

                <div>

                    {icon()}

                </div>

                <div className="flex-1">

                    <div className="flex justify-between">

                        <h3 className="font-semibold">

                            Day {day.day}

                        </h3>

                        <span className="text-sm text-neutral-500">

                            {day.estimatedTime}

                        </span>

                    </div>

                    <p className="mt-1">

                        {day.title}

                    </p>

                    <div className="mt-2 flex gap-4 text-sm text-neutral-500">

                        <span>

                            {day.tasks.length} Tasks

                        </span>

                        <span>

                            {day.focus.length} Focus

                        </span>

                    </div>

                </div>

            </div>

        </motion.div>

    );

};

export default DayTimelineItem;