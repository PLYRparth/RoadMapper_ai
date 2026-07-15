const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3

          text-white
          placeholder:text-zinc-500

          transition-all

          focus:border-white
          focus:outline-none
          focus:ring-2
          focus:ring-white/10
        "
      />
    </div>
  );
};

export default Input;