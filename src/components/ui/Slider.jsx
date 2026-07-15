const Slider = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-medium text-zinc-300">
        <span>Duration</span>
        <span className="font-mono text-xs text-zinc-500">
          {value} Days
        </span>
      </div>

      <input
        type="range"
        min="7"
        max="365"
        value={value}
        onChange={onChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-white"
      />
    </div>
  );
};

export default Slider;
