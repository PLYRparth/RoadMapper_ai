import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { getAccentClasses } from "../../utils/accent";

const TaskItem = ({
  task,
  onToggle,
  disabled = false,
  accent = "blue",
}) => {
  const accentClasses = getAccentClasses(accent);

  return (
    <motion.label
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        group
        flex
        cursor-pointer
        items-start
        gap-3
        rounded-lg
        px-2.5
        py-2.5
        transition-all
        duration-200

        ${disabled ? "cursor-not-allowed opacity-60" : "hover:bg-white/[0.04]"}
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
          h-5
          w-5
          flex-shrink-0
          items-center
          justify-center
          rounded-full
          border
          transition-all
          duration-200

          ${
            task.isCompleted
              ? `${accentClasses.borderStrong} ${accentClasses.bgSolid} ${accentClasses.shadow} text-white`
              : "border-zinc-600 bg-white/[0.02] group-hover:border-zinc-400"
          }
        `}
      >
        {task.isCompleted && <Check size={13} strokeWidth={3} />}
      </div>

      <span
        className={`
          flex-1
          text-sm
          leading-5
          transition-colors
          duration-200

          ${task.isCompleted ? "text-zinc-500 line-through decoration-zinc-600" : "text-zinc-200"}
        `}
      >
        {task.text}
      </span>
    </motion.label>
  );
};

export default TaskItem;
