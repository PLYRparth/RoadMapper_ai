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

  const editable =
    status === "current";

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

    if(!result.success){

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

    <div className="sticky top-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Day {selectedDay.day}

          </h2>

          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm">

            {status}

          </span>

        </div>

        <h3 className="mt-2 text-lg font-semibold">

          {selectedDay.title}

        </h3>

      </div>

      <section className="mb-6">

        <h4 className="mb-2 font-semibold">

          Description

        </h4>

        <p className="text-neutral-600">

          {selectedDay.description}

        </p>

      </section>

      <section className="mb-6">

        <h4 className="mb-2 font-semibold">

          Focus

        </h4>

        <ul className="list-disc space-y-1 pl-5">

          {

            selectedDay.focus.map(item=>(

              <li key={item}>

                {item}

              </li>

            ))

          }

        </ul>

      </section>

      <section className="mb-6">

        <h4 className="mb-2 font-semibold">

          Resources

        </h4>

        <ul className="space-y-2">

          {

            selectedDay.resources.map(resource=>(

              <li key={resource}>

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

            selectedDay.tasks.map(task=>(

              <TaskItem

                key={task.id}

                task={task}

                onToggle={()=>
                  editable &&
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

        <h4 className="mb-2 font-semibold">

          Challenge

        </h4>

        <p>

          {selectedDay.challenge}

        </p>

      </section>

      <section className="mb-6">

        <h4 className="mb-2 font-semibold">

          Reflection

        </h4>

        <p>

          {selectedDay.reflection}

        </p>

      </section>

      <section className="mb-6">

        <h4 className="mb-2 font-semibold">

          Notes

        </h4>

        <textarea

          rows={5}

          value={notes}

          disabled={!editable}

          onChange={(e)=>
            setNotes(
              e.target.value
            )
          }

          className="w-full rounded-xl border border-neutral-300 p-3"

        />

      </section>

      {

        editable && (

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
                  task=>
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