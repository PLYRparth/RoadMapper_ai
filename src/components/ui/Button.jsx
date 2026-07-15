const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const styles = {
    primary:
      "bg-white text-black hover:bg-zinc-200",

    secondary:
      "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center

        rounded-2xl

        px-12
        py-8.5
        text-sm
        font-semibold

        transition-all
        duration-200

        hover:scale-[1.02]
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;