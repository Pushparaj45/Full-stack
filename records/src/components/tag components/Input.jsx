import React, { useState } from 'react';

function Input({ label, type, placeholder, onChange }) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        if (onChange) {
            onChange(event.target.value); 
        }
    };

    return (
        <div className="flex flex-col gap-1 mt-4 mb-0">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="border border-stone-400 rounded-md px-3 py-2 text-stone-700 focus:outline-none focus:border-stone-600"
            />
        </div>
    );
}

export default Input;