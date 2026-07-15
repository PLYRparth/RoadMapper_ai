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
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b] px-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-xl rounded-xl border border-white/[0.1] bg-[#111113] p-8 shadow-[0_1px_1px_rgba(0,0,0,0.22),0_24px_48px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-10"
      >
        <div className="flex justify-center">
          {completed ? (
            <CheckCircle2 size={44} className="text-emerald-400" />
          ) : (
            <LoaderCircle size={44} className="animate-spin text-white" />
          )}
        </div>

        <h1 className="mt-6 text-center text-3xl font-semibold tracking-[-0.04em] text-white">
          {completed ? "Roadmap ready" : "Building your personalized roadmap"}
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-zinc-400">
          This usually takes around 10-20 seconds.
        </p>

        <div className="mt-10">
          <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.04]">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-white"
            />
          </div>

          <div className="mt-2 text-right font-mono text-xs text-zinc-500">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>

        <div className="mt-10 space-y-3">
          {steps.map((step, index) => {
            const done = index < currentStep;
            const active = index === currentStep;

            return (
              <motion.div key={step} layout className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 size={17} className="text-emerald-400" />
                ) : active ? (
                  <LoaderCircle size={17} className="animate-spin text-white" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-zinc-700" />
                )}

                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${step}-${active}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: active ? [0.55, 1, 0.55] : 1 }}
                    transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
                    className={
                      done
                        ? "text-sm text-zinc-400"
                        : active
                          ? "text-sm text-white"
                          : "text-sm text-zinc-600"
                    }
                  >
                    {step}
                    {active && !completed && "..."}
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
