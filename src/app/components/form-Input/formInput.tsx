import { useState, useEffect } from "react";

interface FormInputProps {
    name: string;
    value: string | number;
    label: string;
    valueChange?: (data: { name: string; value: string }) => void;
    children?: React.ReactNode;
    otpModal?: () => void;
    verify?: boolean;
    id?: string;
    style?: React.CSSProperties;
    [key: string]: any; // for other props like disabled, placeholder etc.
}

function FormInput({
    name,
    value,
    label,
    valueChange,
    style,
    id,
    ...otherProps
}: FormInputProps) {
    const [input, setInput] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(value);
        valueChange?.({ name, value }); // optional chaining in case it's not passed
    };

    useEffect(() => {
        setInput(value);
    }, [value]);

    return (
        <div className="relative w-full mb-6" style={style}>
            <input
                id={id || name}
                name={name}
                value={input}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#05EBFB] focus:ring-1 focus:ring-[#05EBFB] disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...otherProps}
                onChange={handleChange}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#05EBFB] to-[#DB19E5] transform scale-x-0 transition-transform duration-300 ease-in-out group-focus-within:scale-x-100"></span>
            <label
                htmlFor={id || name}
                className="absolute left-4 -top-2.5 px-2 text-sm text-gray-600 bg-white transition-all duration-200 ease-in-out pointer-events-none"
            >
                {label}
            </label>
        </div>
    );
}

export default FormInput;
