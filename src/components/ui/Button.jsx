import clsx from "clsx";

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) => {

    return (

        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(

                "w-full rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200",

                variant === "primary" &&
                    "bg-black text-white hover:bg-neutral-800",

                variant === "secondary" &&
                    "border border-neutral-300 bg-white hover:bg-neutral-100",

                disabled &&
                    "cursor-not-allowed opacity-60",

                className
            )}
        >

            {children}

        </button>

    );
};

export default Button;