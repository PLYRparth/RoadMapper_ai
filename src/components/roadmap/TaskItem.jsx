import { motion } from "framer-motion";
import { Check } from "lucide-react";

const TaskItem = ({ task, onToggle }) => {
    return (
        <motion.label
            layout
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                x: 50,
            }}
            transition={{
                duration: 0.2,
            }}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:bg-neutral-50"
        >
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={onToggle}
                className="hidden"
            />

            <div
                className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all ${task.isCompleted
                        ? "border-black bg-black text-white"
                        : "border-neutral-400"
                    }`}
            >
                {task.isCompleted && <Check size={16} />}
            </div>

            <span
                className={`flex-1 ${task.isCompleted
                        ? "text-neutral-400 line-through"
                        : ""
                    }`}
            >
                {task.text}
            </span>
        </motion.label>
    );
};

export default TaskItem;