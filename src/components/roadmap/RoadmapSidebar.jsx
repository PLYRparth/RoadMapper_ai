import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import TaskItem from "./TaskItem";
import { ExternalLink } from "lucide-react";

import {
  completeDay,
  completeTask,
  getDayStatus,
  saveNotes,
} from "../../utils/roadmap";
import { getAccentClasses } from "../../utils/accent";

const RoadmapSidebar = ({
  roadmap,
  selectedDay,
  refresh,
}) => {
  const [notes, setNotes] = useState("");
  const accentClasses = getAccentClasses(roadmap.accent);

  useEffect(() => {
    setNotes(selectedDay.notes || "");
  }, [selectedDay]);

  const status = getDayStatus(roadmap, selectedDay.day - 1);
  const tasksEditable = status === "current";
  const notesEditable = status === "current" || status === "completed";

  const handleTaskToggle = (taskId) => {
    completeTask(roadmap.id, selectedDay.day, taskId);
    refresh();
  };

  const handleSaveNotes = () => {
    saveNotes(roadmap.id, selectedDay.day, notes);
    toast.success("Notes saved.");
    refresh();
  };

  const handleCompleteDay = () => {
    const result = completeDay(roadmap.id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Next day unlocked");
    refresh();
  };

  const statusClasses =
    status === "current"
      ? `${accentClasses.border} ${accentClasses.bgSoft} ${accentClasses.text}`
      : status === "completed"
        ? "border-white/[0.08] bg-white/[0.035] text-zinc-300"
        : "border-white/[0.08] bg-white/[0.035] text-zinc-500";

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-4 shadow-[0_1px_1px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Day {selectedDay.day}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            {selectedDay.title}
          </h2>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusClasses}`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-5">
        <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Description
          </h4>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {selectedDay.description}
          </p>
        </section>

        <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between px-2 sm:px-0">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Tasks
            </h4>
            <span className="font-mono text-xs text-zinc-500">
              {selectedDay.tasks.filter((task) => task.isCompleted).length}/{selectedDay.tasks.length}
            </span>
          </div>

          <div className="space-y-1">
            {selectedDay.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                accent={roadmap.accent}
                disabled={!tasksEditable}
                onToggle={() => tasksEditable && handleTaskToggle(task.id)}
              />
            ))}
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Focus
            </h4>
            <ul className="mt-3 space-y-1.5">
              {selectedDay.focus.map((item) => (
                <li className="flex gap-3 text-sm leading-6 text-zinc-300" key={item}>
                  <span className={`mt-2 h-1.5 w-1.5 rounded-full ${accentClasses.dot}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Resources
            </h4>
            <ul className="space-y-3 py-2">
              {selectedDay.resources.map((resource) => {

                const isUrl =
                  resource.startsWith("http://") ||
                  resource.startsWith("https://");

                const href = isUrl
                  ? resource
                  : `https://www.google.com/search?q=${encodeURIComponent(resource)}`;

                return (
                  <li key={resource}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-2 py-2 text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                    >
                      <span>{resource}</span>

                      <ExternalLink size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Challenge
            </h4>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {selectedDay.challenge}
            </p>
          </section>

          <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Reflection
            </h4>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              {selectedDay.reflection}
            </p>
          </section>
        </div>

        <section className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-4">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Notes
          </h4>

          <textarea
            rows={4}
            value={notes}
            disabled={!notesEditable}
            placeholder="Capture observations, links, and next steps..."
            onChange={(e) => setNotes(e.target.value)}
            className="mt-3 w-full resize-y rounded-md border border-white/10 bg-[#09090b] p-4 text-sm leading-6 text-white placeholder:text-zinc-600 transition-all duration-200 hover:border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </section>
      </div>

      {tasksEditable && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleSaveNotes} variant="secondary">
            Save Notes
          </Button>

          <Button
            disabled={selectedDay.tasks.some((task) => !task.isCompleted)}
            onClick={handleCompleteDay}
          >
            Complete Day
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoadmapSidebar;
