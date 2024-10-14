import React from 'react';
import './Editmodal.css';

function Editmodal({ isOpen, onClose, onSave, field, value, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit {field}</h3>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={`Enter new ${field}`}
        />
        <div className="modal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Editmodal;
