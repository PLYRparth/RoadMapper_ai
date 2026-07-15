import { motion } from "framer-motion";

const ProgressBar = ({
  value,
  height = "h-3",
  showPercentage = true,
}) => {
  return (
    <div className="space-y-3">

      <div
        className={`${height} overflow-hidden rounded-full bg-zinc-800`}
      >

        <motion.div
          className="h-full rounded-full bg-white"
          initial={{
            width: 0,
          }}
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        />

      </div>

      {showPercentage && (

        <p className="text-right text-sm font-medium text-zinc-400">

          {value}%

        </p>

      )}

    </div>
  );
};

export default ProgressBar;