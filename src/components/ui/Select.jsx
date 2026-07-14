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

                className="w-full rounded-xl border border-neutral-300 px-4 py-3"

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