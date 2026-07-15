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
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                    {roadmap.goal}
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                    {day.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                        Day {day.day}
                    </span>
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                        {day.tasks.length} Tasks
                    </span>
                </div>
            </div>

            {/* Progress */}

            <div className="mb-6">

                <div className="mb-2 flex justify-between text-sm">

                    <span>Today's Progress</span>

                    <span>
                        {completed.length} / {day.tasks.length}
                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                    <motion.div
                        className="h-full rounded-full bg-white"
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

                <h3 className="mb-5 text-lg font-semibold">
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

                        <Card
                            padding="md"
                            hover={false}
                            className="border-green-500/30 bg-green-500/10"
                        >

                            <h4 className="text-lg font-semibold text-green-400">

                                All tasks completed 🎉

                            </h4>

                            <p className="mt-2 text-sm text-zinc-300">

                                You're ready to unlock the next day.

                            </p>

                        </Card>

                    </motion.div>

                )}

            </div>

            {/* Completed */}

            <div className="mt-6">

                <button
                    onClick={() =>
                        setExpanded(!expanded)
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-zinc-800 px-4 py-4 hover:bg-zinc-900"
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
                className="mt-8 w-full"
                disabled={pending.length > 0}
                onClick={handleCompleteDay}
            >
                {pending.length > 0
                    ? `${pending.length} Task${pending.length > 1 ? "s" : ""} Remaining`
                    : "Complete Day →"}
            </Button>

        </Card>
    );
};

export default RoadmapTaskGroup;