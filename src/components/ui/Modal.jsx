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
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="max-h-[88vh] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#111113] p-6 shadow-[0_1px_1px_rgba(0,0,0,0.22),0_24px_48px_-24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
