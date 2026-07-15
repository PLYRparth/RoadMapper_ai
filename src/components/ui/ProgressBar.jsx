import { motion } from "framer-motion";

const ProgressBar = ({
  value,
  height = "h-3",
  showPercentage = true,
}) => {
  return (
    <div className="space-y-2.5">
      <div
        className={`${height} overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.04]`}
      >
        <motion.div
          className="h-full rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.18)]"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>

      {showPercentage && (
        <p className="font-mono text-right text-xs text-zinc-500">
          {value}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
