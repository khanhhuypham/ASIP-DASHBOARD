import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";

interface InputCustomProps {
    label: string;
    name: string;
    value?: string | number;
    required?: boolean;
    type?:type
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
    onChange?: (value: string) => void;
    disabled?: boolean
    error?: string | false,
}

type type = 'number' | 'text' | 'password'; // Removed 'default' from SelectMode
export const InputCustom: React.FC<InputCustomProps> = ({
    label,
    name,
    value,
    required = false,
    type = "text",
    prefix,
    suffix,
    onChange,
    disabled,
    error
}) => {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleLabelClick = () => {
        setIsActive(true);
        inputRef.current?.focus();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsActive(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setIsActive(false);
        }
    };

    const inputStyles = {
        width: "100%",
        height: 18, // Example fixed height (adjust as needed)
        outline: "none",
    };


    useEffect(() => {
     
        setIsActive(value ? true : false)

    }, [value])

    useEffect(() => {
       

    }, [error])



    return (
        <div className="h-[48px] border rounded-md shadow px-2 py-1 focus:ring focus:ring-blue-200 flex items-center">
            {prefix && <span>{prefix}</span>}
            <div className="h-full w-full">
                <label
                    htmlFor={name}
                    className={`block mb-0 transition-all duration-300 ${isActive
                        ? "text-xs font-normal text-gray-400"
                        : "cursor-pointer text-base h-full flex items-center"
                        }`}
                    onClick={!isActive ? handleLabelClick : undefined}
                >
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>

                {isActive && (
                    <>
                        <input
                            id={name}
                            name={name}
                            ref={inputRef}
                            style={inputStyles}
                            value={value}
                            type={type ?? "text"}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => onChange?.(e.target.value)}
                            disabled={disabled}
                            className="disabled: bg-white"
                        />
                    </>
                )}
                {error ? <div className="mt-[6px] translate-x-[-8px] text-xs text-red-500">{error}</div> : null}
            </div>
            {suffix && <span>{suffix}</span>}
        </div>
    );
};