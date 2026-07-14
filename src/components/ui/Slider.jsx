const Slider = ({
    value,
    onChange,
}) => {

    return (

        <div className="space-y-3">

            <div className="flex justify-between">

                <span>

                    Duration

                </span>

                <span>

                    {value} Days

                </span>

            </div>

            <input

                type="range"

                min="7"

                max="365"

                value={value}

                onChange={onChange}

                className="w-full"

            />

        </div>

    );

};

export default Slider;