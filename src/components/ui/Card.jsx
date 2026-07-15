import { motion } from "framer-motion";

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
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
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
            }
          : {}
      }
      whileTap={
        onClick
          ? {
              scale: 0.995,
            }
          : {}
      }
      transition={{
        duration: 0.2,
      }}
      onClick={onClick}
      className={`
        rounded-[30px]
        border
        border-zinc-800
        bg-[#18181B]

        ${paddings[padding]}

        shadow-xl

        transition-all
        duration-200

        ${
          hover
            ? "hover:border-zinc-700 hover:shadow-2xl"
            : ""
        }

        ${onClick ? "cursor-pointer" : ""}

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;