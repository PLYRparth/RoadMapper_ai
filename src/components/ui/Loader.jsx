import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

const steps = [
  "Understanding your goal",
  "Planning milestones",
  "Breaking goal into daily tasks",
  "Preparing daily challenges",
  "Finding learning resources",
  "Optimizing roadmap",
  "Finalizing roadmap",
];

const Loader = ({ completed = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 2200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return prev;

        return prev + Math.random() * 7;
      });
    }, 650);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (completed) {
      setProgress(100);
    }
  }, [completed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]">

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(59,130,246,.12), transparent 60%)",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="relative w-full max-w-xl rounded-3xl border border-zinc-800 bg-[#18181B] p-10 shadow-2xl"
      >

        <div className="flex justify-center">

          {completed ? (
            <CheckCircle2
              size={52}
              className="text-green-500"
            />
          ) : (
            <LoaderCircle
              size={52}
              className="animate-spin"
            />
          )}

        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">

          {completed
            ? "Roadmap Ready!"
            : "Building your personalized roadmap"}

        </h1>

        <p className="mt-3 text-center text-zinc-400">

          This usually takes around 10–20 seconds.

        </p>

        <div className="mt-10">

          <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full rounded-full bg-white"
            />

          </div>

          <div className="mt-2 text-right text-sm text-zinc-500">

            {Math.min(
              Math.round(progress),
              100
            )}
            %

          </div>

        </div>

        <div className="mt-10 space-y-4">

          {steps.map((step, index) => {

            const done =
              index < currentStep;

            const active =
              index === currentStep;

            return (

              <motion.div
                key={step}
                layout
                className="flex items-center gap-4"
              >

                {done ? (

                  <CheckCircle2
                    size={18}
                    className="text-green-500"
                  />

                ) : active ? (

                  <LoaderCircle
                    size={18}
                    className="animate-spin text-blue-400"
                  />

                ) : (

                  <div className="h-4 w-4 rounded-full border border-zinc-600" />

                )}

                <AnimatePresence mode="wait">

                  <motion.span
                    key={`${step}-${active}`}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: active
                        ? [0.5, 1, 0.5]
                        : 1,
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: active
                        ? Infinity
                        : 0,
                    }}
                    className={
                      done
                        ? "text-zinc-400"
                        : active
                        ? "text-white"
                        : "text-zinc-600"
                    }
                  >

                    {step}

                    {active &&
                      !completed &&
                      "..."}

                  </motion.span>

                </AnimatePresence>

              </motion.div>

            );

          })}

        </div>

      </motion.div>

    </div>
  );
};

export default Loader;