import React, { useState, useRef, useEffect } from 'react';

/**
 * EditableCell - Inline editable cell component
 * Matches Monday.com's inline editing behavior
 */
const EditableCell = ({ value, onSave, type = 'text', placeholder = '', className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue !== value) {
      onSave(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value || '');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full h-full px-2 py-1 text-[13px] text-[#323338] bg-white border-2 border-blue-500 rounded focus:outline-none ${className}`}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`w-full h-full px-2 py-1 text-[13px] text-[#323338] cursor-pointer hover:bg-gray-50 flex items-center ${className}`}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
  );
};

export default EditableCell;
