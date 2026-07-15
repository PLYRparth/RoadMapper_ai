const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const styles = {
    primary:
      "border border-white bg-white text-black shadow-[0_1px_1px_rgba(0,0,0,0.08)] hover:border-zinc-200 hover:bg-zinc-200",

    secondary:
      "border border-white/10 bg-white/[0.03] text-white hover:border-white/18 hover:bg-white/[0.07]",

    danger:
      "border border-red-500/70 bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        min-h-10
        items-center
        justify-center
        gap-2

        rounded-full

        px-4
        py-2
        text-sm
        font-medium
        leading-5

        transition-all
        duration-200

        hover:-translate-y-0.5
        active:translate-y-0
        active:scale-[0.99]

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0

        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
