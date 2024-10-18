import React from 'react';
import './Editmodal.css';
import PopoverDropdown from '../countrypopover/PopoverDropdown'; // Import the Popover component

function Editmodal({ isOpen, onClose, onSave, field, value, onChange, locations }) {
    if (!isOpen) return null;

    const handleLocationSelect = (selectedLocation) => {
        onChange({ target: { value: selectedLocation } }); // Simulate input change for the selected location
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit {field}</h3>
                {field === 'location' ? (
                    <PopoverDropdown 
                        options={locations} 
                        selected={value} 
                        onSelect={handleLocationSelect} 
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={`Enter new ${field}`}
                    />
                )}
                <div className="modal-buttons">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Editmodal;
