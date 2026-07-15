const Select = ({
    label,
    value,
    onChange,
    options,
}) => {

    return (

        <div className="space-y-2">

            <label className="text-sm font-medium">

                {label}

            </label>

            <select

                value={value}

                onChange={onChange}

                className="w-full
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
          focus:ring-white/10"

            >

                {

                    options.map(option=>(

                        <option key={option}>

                            {option}

                        </option>

                    ))

                }

            </select>

        </div>

    );

};

export default Select;