// PopoverDropdown.js
import React, { useState } from 'react';
import './PopoverDropdown.css'; // Create your own styles

const PopoverDropdown = ({ options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="popover-dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
                {selected ? selected : 'Select Country'} ▼
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option.country_name)}
                        >
                            {option.country_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopoverDropdown;
