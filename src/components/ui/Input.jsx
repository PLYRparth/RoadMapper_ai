const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          min-h-11
          w-full
          rounded-md
          border
          border-white/10
          bg-white/[0.035]
          px-4
          py-2.5

          text-white
          placeholder:text-zinc-500

          transition-all
          duration-200

          hover:border-white/20
          focus:border-white/40
          focus:outline-none
          focus:ring-2
          focus:ring-white/[0.08]
        "
      />
    </div>
  );
};

export default Input;
