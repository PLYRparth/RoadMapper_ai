import { AnimatePresence, motion } from "framer-motion";

const Modal = ({
  open,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8 shadow-2xl">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;