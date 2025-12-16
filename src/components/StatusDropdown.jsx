// src/components/StatusDropdown.jsx - Status dropdown with edit and add label
import React, { useState } from 'react';
import { Pencil, Plus, Check, X } from 'lucide-react';

const StatusDropdown = ({ currentStatus, statusOptions, onStatusChange, onEditLabel, onAddLabel }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState('#0073ea');

  const getCurrentStatusColor = () => {
    const status = statusOptions.find(s => s.label === currentStatus);
    return status?.color || '#c4c4c4';
  };

  const handleEditLabel = (statusId, currentLabel) => {
    setEditingId(statusId);
    setEditValue(currentLabel);
  };

  const handleSaveEdit = (statusId) => {
    if (editValue.trim() && onEditLabel) {
      onEditLabel(statusId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleAddNew = () => {
    if (newLabel.trim() && onAddLabel) {
      onAddLabel({
        label: newLabel.trim(),
        color: newColor
      });
      setNewLabel('');
      setNewColor('#0073ea');
      setIsAddingNew(false);
    }
  };

  const colorOptions = [
    '#0073ea', '#fdab3d', '#00c875', '#e44258', '#c4c4c4',
    '#579bfc', '#a25ddc', '#ff158a', '#bb3354', '#784bd1',
    '#ffcb00', '#00d2d2', '#037f4c', '#9cd326', '#cab641'
  ];

  return (
    <div className="relative w-full">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full px-3 py-1.5 rounded-md text-white text-sm font-medium hover:opacity-90 transition-opacity"
        style={{ backgroundColor: getCurrentStatusColor() }}
      >
        {currentStatus || 'Not Started'}
      </button>

      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => {
              setShowMenu(false);
              setIsAddingNew(false);
              setEditingId(null);
            }}
          />
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 w-64">
            {/* Status Options */}
            <div className="max-h-64 overflow-y-auto">
              {statusOptions.map(status => (
                <div
                  key={status.id}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 group"
                >
                  {editingId === status.id ? (
                    // Edit Mode
                    <>
                      <div 
                        className="w-4 h-4 rounded-sm flex-shrink-0" 
                        style={{ backgroundColor: status.color }}
                      />
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-2 py-1 border border-blue-500 rounded text-sm outline-none"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit(status.id);
                        }}
                      />
                      <button
                        onClick={() => handleSaveEdit(status.id)}
                        className="p-1 hover:bg-green-100 rounded"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </>
                  ) : (
                    // Normal Mode
                    <>
                      <button
                        onClick={() => {
                          onStatusChange(status.label);
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-2 flex-1"
                      >
                        <div 
                          className="w-4 h-4 rounded-sm flex-shrink-0" 
                          style={{ backgroundColor: status.color }}
                        />
                        <span className="text-sm text-gray-900">{status.label}</span>
                      </button>
                      <button
                        onClick={() => handleEditLabel(status.id, status.label)}
                        className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit label"
                      >
                        <Pencil className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Label Section */}
            {isAddingNew ? (
              <div className="border-t mt-2 pt-2 px-3">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Label name"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleAddNew();
                    }}
                  />
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-2">Choose color:</div>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewColor(color)}
                        className={`w-6 h-6 rounded-sm transition-all ${
                          newColor === color ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNew}
                    className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewLabel('');
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-blue-600 text-sm border-t mt-2 pt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add new label</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StatusDropdown;
