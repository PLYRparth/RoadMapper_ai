const Input = ({
    label,
    value,
    onChange,
    placeholder,
}) => {

    return (

        <div className="space-y-2">

            <label className="text-sm font-medium">

                {label}

            </label>

            <input

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 transition focus:border-black"

            />

        </div>

    );

};

export default Input;