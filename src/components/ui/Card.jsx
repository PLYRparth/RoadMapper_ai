import { motion } from "framer-motion";

const paddings = {
  sm: "p-4",
  md: "p-5",
  lg: "p-5 sm:p-6",
  xl: "p-6 sm:p-8",
};

const Card = ({
  children,
  className = "",
  onClick,
  padding = "lg",
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      whileTap={onClick ? { scale: 0.995 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        rounded-xl
        border
        border-white/[0.08]
        bg-[#111113]

        ${paddings[padding]}

        shadow-[0_1px_1px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.03)]

        transition-all
        duration-200

        ${hover ? "hover:border-white/[0.14] hover:bg-[#151518]" : ""}

        ${onClick ? "cursor-pointer" : ""}

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
