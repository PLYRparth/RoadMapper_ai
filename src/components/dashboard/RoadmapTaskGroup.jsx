import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Button from "../ui/Button";
import TaskItem from "../roadmap/TaskItem";
import { ChevronDown } from "lucide-react";

import { completeTask, completeDay } from "../../utils/roadmap";
import { getCurrentDayTasks } from "../../utils/progress";
import { getAccentClasses } from "../../utils/accent";

const RoadmapTaskGroup = ({
  roadmap,
  refresh,
}) => {
  const [expanded, setExpanded] = useState(false);
  const accentClasses = getAccentClasses(roadmap.accent);

  const { day, pending, completed } = getCurrentDayTasks(roadmap);

  const progress =
    day.tasks.length === 0
      ? 0
      : (completed.length / day.tasks.length) * 100;

  const handleTaskToggle = (taskId) => {
    const task = day.tasks.find((task) => task.id === taskId);
    const wasCompleted = task.isCompleted;

    completeTask(roadmap.id, day.day, taskId);

    if (wasCompleted) {
      toast("Task marked incomplete");
    } else {
      toast.success("Task completed");
    }

    refresh();
  };

  const handleCompleteDay = () => {
    const result = completeDay(roadmap.id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(`Day ${day.day} completed!`);
    refresh();
  };

  return (
    <Card className="relative overflow-hidden" hover={false}>
      <div className={`absolute inset-y-0 left-0 w-0.2 border border-gray-200`} />

      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 pl-1 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentClasses.dot}`} />
            <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {roadmap.goal}
            </p>
          </div>

          <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.035em] text-white">
            {day.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs ${accentClasses.border} ${accentClasses.bgSoft} ${accentClasses.text}`}>
              Day {day.day}
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-xs text-zinc-300">
              {day.tasks.length} tasks
            </span>
          </div>
        </div>

        <div className="w-full md:w-48">
          <div className="mb-2 flex justify-between font-mono text-xs text-zinc-500">
            <span>Progress</span>
            <span>{completed.length}/{day.tasks.length}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 pl-1">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-medium text-zinc-300">Pending</h4>
          <span className="font-mono text-xs text-zinc-500">{pending.length} left</span>
        </div>

        <div className="space-y-1">
          <AnimatePresence>
            {pending.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                accent={roadmap.accent}
                onToggle={() => handleTaskToggle(task.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {pending.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-lg border p-3 ${accentClasses.border} ${accentClasses.bgSoft}`}
          >
            <h4 className={`text-sm font-medium ${accentClasses.text}`}>
              All tasks completed
            </h4>
            <p className="mt-1 text-sm text-zinc-400">
              You are ready to unlock the next day.
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-5 pl-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:bg-white/[0.05]"
        >
          <span>Completed today ({completed.length})</span>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 space-y-1 overflow-hidden"
            >
              {completed.length === 0 ? (
                <p className="px-3 py-3 text-sm text-zinc-500">
                  No completed tasks yet.
                </p>
              ) : (
                completed.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    accent={roadmap.accent}
                    onToggle={() => handleTaskToggle(task.id)}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        className="mt-5 w-full sm:w-auto"
        disabled={pending.length > 0}
        onClick={handleCompleteDay}
      >
        {pending.length > 0
          ? `${pending.length} Task${pending.length > 1 ? "s" : ""} Remaining`
          : "Complete Day"}
      </Button>
    </Card>
  );
};

export default RoadmapTaskGroup;
