import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TaskItem = ({
  task,
  onToggle,
  disabled = false,
}) => {
  return (
    <motion.label
      layout
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        flex
        cursor-pointer
        items-start
        gap-4
        py-4

        border-b
        border-zinc-800

        last:border-b-0

        transition-colors

        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "hover:bg-zinc-900/40"
        }
      `}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        disabled={disabled}
        onChange={onToggle}
        className="hidden"
      />

      <div
        className={`
          mt-0.5
          flex
          h-6
          w-6
          flex-shrink-0
          items-center
          justify-center
          rounded-md
          border
          transition-all

          ${
            task.isCompleted
              ? "border-green-500 bg-green-500 text-white"
              : "border-zinc-600"
          }
        `}
      >
        {task.isCompleted && (
          <Check size={16} />
        )}
      </div>

      <span
        className={`
          flex-1
          text-sm
          leading-6

          ${
            task.isCompleted
              ? "text-zinc-500 line-through"
              : "text-zinc-200"
          }
        `}
      >
        {task.text}
      </span>
    </motion.label>
  );
};

export default TaskItem;