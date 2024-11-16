import React, { useState, useCallback } from 'react';

const TagInput = ({ value = [], onChange }) => {
    const [inputValue, setInputValue] = useState(''); 

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' && inputValue.trim() !== '') {
                e.preventDefault();
                const trimmedValue = inputValue.trim(); 
                if (value.length < 5 && !value.includes(trimmedValue)) {
                    onChange([...value, trimmedValue]);
                    setInputValue('');  
                }
            }
        },
        [inputValue, value, onChange]
    );
 
    const removeTag = useCallback(
        (indexToRemove) => {
            onChange(value.filter((_, index) => index !== indexToRemove));
        },
        [value, onChange]
    );

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                <p className="text-xs text-gray-500 mb-2">
                    Add up to 5 tags to describe what your question is about
                </p>
                <div className="flex items-center border rounded px-2 py-1"> 
                    {value.map((tag, index) => (
                        <div key={index} className="bg-gray-200 rounded-full px-2 py-1 mr-2 flex items-center">
                            <span>{tag}</span>
                            <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => removeTag(index)}
                            >
                                &times;
                            </button>
                        </div>
                    ))} 
                    {value.length < 5 && (
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-grow px-2 py-1 focus:outline-none"
                            placeholder="e.g. javascript"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagInput;
