import React from "react";

function Input({
    type = "text",
    name,
    placeholder,
    onChange,
    value,
    required,
    disabled
}) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            disabled={disabled}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-1 focus:ring-blue-500"
        />
    );
}

export default Input;