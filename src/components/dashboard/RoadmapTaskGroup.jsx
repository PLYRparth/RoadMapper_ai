import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";
import TaskItem from "../roadmap/TaskItem";
import { ChevronDown } from "lucide-react";

import {
    completeTask,
    completeDay,
} from "../../utils/roadmap";

import {
    getCurrentDayTasks,
} from "../../utils/progress";

const RoadmapTaskGroup = ({
    roadmap,
    refresh,
}) => {
    const [expanded, setExpanded] = useState(false);

    const {
        day,
        pending,
        completed,
    } = getCurrentDayTasks(roadmap);

    const progress =
        day.tasks.length === 0
            ? 0
            : (completed.length / day.tasks.length) * 100;

    const handleTaskToggle = (taskId) => {
        const task = day.tasks.find(
            (task) => task.id === taskId
        );

        const wasCompleted = task.isCompleted;

        completeTask(
            roadmap.id,
            day.day,
            taskId
        );

        if (wasCompleted) {
            toast("Task marked incomplete");
        } else {
            toast.success("Task completed 🎉");
        }

        refresh();
    };

    const handleCompleteDay = () => {
        const result = completeDay(roadmap.id);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(
            `Day ${day.day} completed!`
        );

        refresh();
    };

    return (
        <Card className="mb-8">

            {/* Header */}

            <div className="mb-5">

                <h2 className="text-xl font-semibold">
                    {roadmap.goal}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                    Day {day.day} / {roadmap.duration}
                </p>

            </div>

            {/* Progress */}

            <div className="mb-6">

                <div className="mb-2 flex justify-between text-sm">

                    <span>Today's Progress</span>

                    <span>
                        {completed.length} / {day.tasks.length}
                    </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-neutral-200">

                    <motion.div
                        className="h-full rounded-full bg-black"
                        animate={{
                            width: `${progress}%`,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                    />

                </div>

            </div>

            {/* Pending */}

            <div>

                <h3 className="mb-3 font-medium">
                    Pending
                </h3>

                <AnimatePresence>

                    {pending.map((task) => (

                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={() =>
                                handleTaskToggle(task.id)
                            }
                        />

                    ))}

                </AnimatePresence>

                {pending.length === 0 && (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className="rounded-xl border border-green-300 bg-green-50 p-4 text-green-700"
                    >

                        🎉 Awesome!

                        <br />

                        You've completed all tasks for today.

                    </motion.div>

                )}

            </div>

            {/* Completed */}

            <div className="mt-6">

                <button
                    onClick={() =>
                        setExpanded(!expanded)
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 hover:bg-neutral-50"
                >

                    <span>
                        <div className="flex items-center gap-2">
                            <span>✅</span>

                            <span>

                                Completed Today ({completed.length})

                            </span>
                        </div>
                    </span>

                    <motion.div
                        animate={{
                            rotate: expanded ? 180 : 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <ChevronDown size={18} />
                    </motion.div>

                </button>

                <AnimatePresence>

                    {expanded && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="mt-4 space-y-3 overflow-hidden"
                        >

                            {completed.length === 0 ? (

                                <p className="text-sm text-neutral-500">
                                    No completed tasks yet.
                                </p>

                            ) : (

                                completed.map((task) => (

                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={() =>
                                            handleTaskToggle(task.id)
                                        }
                                    />

                                ))

                            )}

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

            {/* Complete Day */}

            <Button
                className="mt-6"
                disabled={pending.length > 0}
                onClick={handleCompleteDay}
            >

                {pending.length > 0
                    ? "Finish Pending Tasks"
                    : "Complete Day →"}

            </Button>

        </Card>
    );
};

export default RoadmapTaskGroup;