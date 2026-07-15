import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import TaskItem from "./TaskItem";

import {
    completeDay,
    completeTask,
    getDayStatus,
    saveNotes,
} from "../../utils/roadmap";

const RoadmapSidebar = ({
    roadmap,
    selectedDay,
    refresh,
}) => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        setNotes(selectedDay.notes || "");
    }, [selectedDay]);

    const status = getDayStatus(
        roadmap,
        selectedDay.day - 1
    );

    const tasksEditable =
        status === "current";

    const notesEditable =
        status === "current" ||
        status === "completed";

    const handleTaskToggle = (
        taskId
    ) => {

        completeTask(
            roadmap.id,
            selectedDay.day,
            taskId
        );

        refresh();

    };

    const handleSaveNotes = () => {

        saveNotes(
            roadmap.id,
            selectedDay.day,
            notes
        );

        toast.success(
            "Notes saved."
        );

        refresh();

    };

    const handleCompleteDay = () => {

        const result =
            completeDay(roadmap.id);

        if (!result.success) {

            toast.error(
                result.message
            );

            return;

        }

        toast.success(
            "Next day unlocked 🚀"
        );

        refresh();

    };

    return (

        <div className="sticky top-6 rounded-3xl border border-zinc-800 bg-[#18181B] p-8 shadow-2xl">

            <div className="mb-6">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold">

                        Day {selectedDay.day}

                    </h2>

                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${status === "completed" ? "bg-green-500/20 text-green-400" : status === "current" ? "bg-blue-500/20 text-blue-400" : "bg-zinc-800 text-zinc-500"}`}>

                        {status}

                    </span>

                </div>

                <h3 className="mt-2 text-lg font-semibold">

                    {selectedDay.title}

                </h3>

            </div>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Description

                </h4>

                <p className="leading-7 text-zinc-300">

                    {selectedDay.description}

                </p>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Focus

                </h4>

                <ul className="list-disc space-y-1 pl-5">

                    {

                        selectedDay.focus.map(item => (

                            <li className="text-zinc-300" key={item}>

                                {item}

                            </li>

                        ))

                    }

                </ul>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Resources

                </h4>

                <ul className="space-y-2">

                    {

                        selectedDay.resources.map(resource => (

                            <li className="text-zinc-300" key={resource}>

                                🔍 {resource}

                            </li>

                        ))

                    }

                </ul>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 font-semibold">

                    Tasks

                </h4>

                <div className="space-y-3">

                    {

                        selectedDay.tasks.map(task => (

                            <TaskItem

                                key={task.id}

                                task={task}

                                onToggle={() =>
                                    tasksEditable &&
                                    handleTaskToggle(
                                        task.id
                                    )
                                }

                            />

                        ))

                    }

                </div>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Challenge

                </h4>

                <p className="leading-7 text-zinc-300">

                    {selectedDay.challenge}

                </p>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Reflection

                </h4>

                <p className="leading-7 text-zinc-300">

                    {selectedDay.reflection}

                </p>

            </section>

            <section className="mb-6">

                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">

                    Notes

                </h4>

                <textarea

                    rows={5}

                    value={notes}

                    disabled={!notesEditable}

                    onChange={(e) =>
                        setNotes(
                            e.target.value
                        )
                    }

                    className=" w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-4 text-white placeholder:text-zinc-500 focus:border-white focus:outline-none disabled:opacity-60"

                />

            </section>

            {

                tasksEditable &&  (

                    <>

                        <Button
                            onClick={
                                handleSaveNotes
                            }
                        >

                            Save Notes

                        </Button>

                        <Button

                            className="mt-3"

                            disabled={
                                selectedDay.tasks.some(
                                    task =>
                                        !task.isCompleted
                                )
                            }

                            onClick={
                                handleCompleteDay
                            }

                        >

                            Complete Day →

                        </Button>

                    </>

                )

            }

        </div>

    );

};

export default RoadmapSidebar;