import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Plus,
  User,
  Maximize2,
  MessageSquarePlus,
  ChevronDown,
  Calendar as CalendarIcon,
  Edit,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Paperclip,
  Smile,
  Check,
  Mail,
  ExternalLink
} from "lucide-react";
import ColumnMenu from "./ColumnMenu";
import AddColumnMenu from "./AddColumnMenu";
import "./TanStackBoardTable.css";

// ==========================================
// TASK NAME CELL COMPONENT (Editable)
// ==========================================
const TaskNameCell = ({ value, rowId, onUpdate, toggleExpanded, isExpanded }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue !== value) {
      onUpdate(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center px-2 h-full w-full relative">
        <div className="flex items-center gap-1 w-full h-full p-[1px]">
          <div className={`p-0.5 text-gray-400 mr-1 flex-shrink-0 ${isExpanded ? "" : "-rotate-90"}`}>
            <ChevronDown size={14} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="w-full h-[30px] px-2 text-[13px] text-[#323338] outline-none border-2 border-[#0073ea] rounded-sm bg-white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between px-2 h-full group/cell w-full relative overflow-hidden cursor-pointer"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center gap-1 text-[13px] text-[#323338] min-w-0 flex-1">
        <button
          onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}
          className={`p-0.5 rounded-sm hover:bg-gray-200 text-gray-500 mr-1 transition-transform flex-shrink-0 ${isExpanded ? "" : "-rotate-90"}`}
        >
          <ChevronDown size={14} />
        </button>
        <span className="truncate flex-1 font-normal min-w-0 select-none">{value || "Item"}</span>
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover/cell:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm pl-2">
        <button className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Add Update">
          <MessageSquarePlus size={15} />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Open Item">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// EMAIL CELL COMPONENT
// ==========================================
const EmailCell = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  if (isEditing) {
    return (
      <div className="w-full h-full relative z-20 p-[1px]">
        <input
          ref={inputRef}
          type="email"
          className="w-full h-full px-2 text-[13px] text-[#323338] outline-none border-2 border-[#0073ea] bg-white rounded-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="name@example.com"
        />
      </div>
    );
  }

  // Display mode
  if (value && isValidEmail(value)) {
    return (
      <div
        className="w-full h-full px-2 flex items-center justify-between gap-2 group/email hover:bg-gray-50 cursor-pointer min-h-[34px] transition-colors"
        onClick={() => setIsEditing(true)}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Mail size={14} className="text-gray-400 flex-shrink-0" />
          <a
            href={`mailto:${value}`}
            className="text-[13px] text-blue-600 hover:text-blue-800 hover:underline truncate"
            onClick={(e) => e.stopPropagation()}
            title={`Send email to ${value}`}
          >
            {value}
          </a>
        </div>
        <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover/email:opacity-100 flex-shrink-0" />
      </div>
    );
  }

  // Empty or invalid email
  return (
    <div
      className="w-full h-full px-2 flex items-center gap-2 text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 cursor-pointer min-h-[34px] transition-colors"
      onClick={() => setIsEditing(true)}
    >
      <Mail size={14} className="text-gray-300 flex-shrink-0" />
      <span className="truncate">Add email address</span>
    </div>
  );
};

// ==========================================
// NUMBER / BUDGET CELL COMPONENT (UPDATED with Unit Support)
// ==========================================
const NumberCell = ({ value, onChange, columnId, columnUnit = '', columnUnitPosition = 'R' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const formatDisplayValue = (val) => {
    if (!val && val !== 0) return "-";
    const num = parseFloat(val);
    if (isNaN(num)) return "-";

    // Check if this is a budget/numbers column and apply unit
    if (columnUnit) {
      if (columnUnitPosition === 'L') {
        return `${columnUnit}${num}`;
      } else {
        return `${num}${columnUnit}`;
      }
    }
    return `${num}`;
  };

  if (isEditing) {
    return (
      <div className="w-full h-full relative z-20 p-[1px]">
        <input
          ref={inputRef}
          type="number"
          className="w-full h-full px-2 text-[13px] text-[#323338] outline-none text-center border-2 border-[#0073ea] bg-white rounded-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }

  return (
    <div
      className="w-full h-full px-2 flex items-center justify-center text-[13px] text-[#323338] truncate border border-transparent hover:border-gray-300 cursor-text min-h-[34px] transition-colors"
      onClick={() => setIsEditing(true)}
    >
      {formatDisplayValue(value)}
    </div>
  );
};

// ==========================================
// FILE CELL COMPONENT
// ==========================================
const FileCell = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 6,
        left: rect.left + (rect.width / 2) - 100
      });
    }
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange([{ name: file.name, type: 'file' }]);
    }
    setIsOpen(false);
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const handleEvent = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener('scroll', handleEvent, true);
      window.addEventListener('resize', handleEvent);
      window.addEventListener('click', handleEvent);
    }
    return () => {
      window.removeEventListener('scroll', handleEvent, true);
      window.removeEventListener('resize', handleEvent);
      window.removeEventListener('click', handleEvent);
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="w-full h-full flex items-center justify-center hover:bg-gray-50 rounded-sm transition-colors group"
        >
          {Array.isArray(value) && value.length > 0 ? (
            <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded border border-gray-200" title={value[0].name}>
              <img src="https://dapulse-res.cloudinary.com/image/upload/file.png" alt="file" className="w-4 h-5" />
            </div>
          ) : (
            <Plus size={16} className="text-gray-300 group-hover:text-gray-400" />
          )}
        </button>
      </div>
      {isOpen && createPortal(
        <div
          className="fixed z-[9999] w-[200px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-lg border border-gray-200 overflow-hidden font-sans p-2"
          style={{ top: coords.top, left: coords.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={triggerFileUpload} className="w-full bg-[#335eea] hover:bg-[#2a4ec2] text-white text-[13px] font-medium py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Paperclip size={14} />
            <span>From Computer</span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

const TextCell = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const inputRef = useRef(null);
  useEffect(() => { setInputValue(value || ""); }, [value]);
  useEffect(() => { if (isEditing && inputRef.current) { inputRef.current.focus(); } }, [isEditing]);
  const handleBlur = () => { setIsEditing(false); if (inputValue !== value) onChange(inputValue); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleBlur(); };
  if (isEditing) {
    return (
      <div className="w-full h-full relative border border-blue-500 bg-white z-20">
        <input ref={inputRef} type="text" className="w-full h-full px-2 text-[13px] text-[#323338] outline-none" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><Smile size={14} /></div>
      </div>
    );
  }
  return <div className="w-full h-full px-2 flex items-center text-[13px] text-[#323338] truncate hover:bg-gray-50 cursor-text min-h-[34px]" onClick={() => setIsEditing(true)}>{value || ""}</div>;
};

const DateCell = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const selectedDate = value ? new Date(value) : null;
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const handleToggle = (e) => { e.stopPropagation(); if (!isOpen && buttonRef.current) { const rect = buttonRef.current.getBoundingClientRect(); setCoords({ top: rect.bottom + 6, left: rect.left + (rect.width / 2) - 130 }); setViewDate(value ? new Date(value) : new Date()); } setIsOpen(!isOpen); };
  useEffect(() => { const handleEvent = () => setIsOpen(false); if (isOpen) { window.addEventListener('scroll', handleEvent, true); window.addEventListener('resize', handleEvent); window.addEventListener('click', handleEvent); } return () => { window.removeEventListener('scroll', handleEvent, true); window.removeEventListener('resize', handleEvent); window.removeEventListener('click', handleEvent); }; }, [isOpen]);
  const year = viewDate.getFullYear(); const month = viewDate.getMonth(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const firstDayOfMonth = new Date(year, month, 1).getDay(); const startDayOffset = (firstDayOfMonth + 6) % 7;
  const handleDateClick = (day) => { onChange(new Date(year, month, day).toISOString()); setIsOpen(false); };
  const changeMonth = (offset) => setViewDate(new Date(year, month + offset, 1));
  const setToday = () => { onChange(new Date().toISOString()); setIsOpen(false); };
  const formatDateDisplay = (date) => date ? date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : "";
  const formatCellDisplay = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;
  return (
    <>
      <div className="w-full h-full flex items-center justify-center px-1">
        <button ref={buttonRef} onClick={handleToggle} className="w-full h-full flex items-center justify-center text-[13px] text-[#323338] gap-1 hover:bg-gray-100 rounded-sm group">
          {value ? <span className="text-gray-700 font-normal">{formatCellDisplay(value)}</span> : <CalendarIcon size={16} className="text-gray-300 group-hover:text-gray-400" />}
        </button>
      </div>
      {isOpen && createPortal(
        <div className="fixed z-[9999] w-[270px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-lg border border-gray-200 overflow-hidden font-sans" style={{ top: coords.top, left: coords.left }} onClick={(e) => e.stopPropagation()}>
          <div className="p-3">
            <div className="flex items-center justify-between mb-3"><button onClick={setToday} className="px-3 py-1 text-[13px] text-gray-700 border border-gray-300 rounded hover:bg-gray-50">Today</button><Clock size={16} className="text-gray-400" /></div>
            <div className="mb-3"><input type="text" readOnly value={selectedDate ? formatDateDisplay(selectedDate) : formatDateDisplay(new Date())} className="w-full border border-blue-500 rounded px-2 py-1.5 text-center text-[13px] text-gray-700 focus:outline-none bg-blue-50/30" /></div>
            <div className="flex items-center justify-between mb-2 px-1"><button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={16} /></button><div className="text-[14px] font-medium text-gray-700 flex gap-1"><span>{viewDate.toLocaleDateString('en-US', { month: 'short' })}</span><ChevronDown size={14} className="mt-1 opacity-50" /><span>{year}</span><ChevronDown size={14} className="mt-1 opacity-50" /></div><button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={16} /></button></div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <div key={day} className="text-center text-[11px] text-gray-400 font-medium py-1">{day}</div>)}
              {Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`} className="h-7"></div>)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1; const current = new Date(year, month, day); const isSelected = selectedDate && current.toDateString() === selectedDate.toDateString(); const isToday = new Date().toDateString() === current.toDateString();
                return <button key={day} onClick={() => handleDateClick(day)} className={`h-7 w-7 rounded flex items-center justify-center text-[13px] mx-auto ${isSelected ? 'bg-[#0073ea] text-white' : isToday ? 'bg-gray-100 text-gray-900 font-bold hover:bg-gray-200' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>{day}</button>;
              })}
            </div>
          </div>
        </div>, document.body
      )}
    </>
  );
};

const TimelineCell = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const startDate = value?.start ? new Date(value.start) : null;
  const endDate = value?.end ? new Date(value.end) : null;
  const [viewDate, setViewDate] = useState(startDate || new Date());
  const [selectionStep, setSelectionStep] = useState(0);
  const [tempStart, setTempStart] = useState(null);
  const handleToggle = (e) => { e.stopPropagation(); if (!isOpen && buttonRef.current) { const rect = buttonRef.current.getBoundingClientRect(); setCoords({ top: rect.bottom + 6, left: rect.left + (rect.width / 2) - 130 }); setViewDate(startDate ? new Date(startDate) : new Date()); setTempStart(startDate && endDate ? startDate : (startDate || null)); setSelectionStep((startDate && !endDate) ? 1 : 0); } setIsOpen(!isOpen); };
  useEffect(() => { const h = () => setIsOpen(false); if (isOpen) { window.addEventListener('scroll', h, true); window.addEventListener('resize', h); window.addEventListener('click', h); } return () => { window.removeEventListener('scroll', h, true); window.removeEventListener('resize', h); window.removeEventListener('click', h); }; }, [isOpen]);
  const year = viewDate.getFullYear(); const month = viewDate.getMonth(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const firstDayOfMonth = new Date(year, month, 1).getDay(); const startDayOffset = (firstDayOfMonth + 6) % 7; const changeMonth = (offset) => setViewDate(new Date(year, month + offset, 1));
  const handleDateClick = (day) => { const clickedDate = new Date(year, month, day); if (selectionStep === 0) { setTempStart(clickedDate); setSelectionStep(1); onChange({ start: clickedDate.toISOString(), end: null }); } else { let newStart = tempStart; let newEnd = clickedDate; if (clickedDate < tempStart) { newStart = clickedDate; newEnd = tempStart; } onChange({ start: newStart.toISOString(), end: newEnd.toISOString() }); setTempStart(newStart); setSelectionStep(0); } };
  const getDayClass = (day) => { const current = new Date(year, month, day); const s = startDate ? new Date(startDate.setHours(0, 0, 0, 0)) : null; const e = endDate ? new Date(endDate.setHours(0, 0, 0, 0)) : null; const c = new Date(current.setHours(0, 0, 0, 0)); if (s && c.getTime() === s.getTime()) return "bg-[#0073ea] text-white rounded-l-md z-10 relative"; if (e && c.getTime() === e.getTime()) return "bg-[#0073ea] text-white rounded-r-md z-10 relative"; if (s && e && c > s && c < e) return "bg-[#dff0ff] text-gray-700 rounded-none relative"; return "text-gray-700 hover:bg-gray-100 rounded-md"; };
  const daysSelected = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1 : (startDate ? 1 : 0); const displayLabel = startDate && endDate ? `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.getDate()}` : (startDate ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "-"); const formatInputDate = (d) => d ? d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : "";
  return (
    <>
      <div className="w-full h-full flex items-center justify-center px-4"><button ref={buttonRef} onClick={handleToggle} className="h-[22px] w-full max-w-[140px] rounded-full relative group cursor-pointer flex items-center justify-center text-[11px] text-white font-medium" style={{ backgroundColor: startDate ? '#579bfc' : '#c4c4c4' }}>{displayLabel}</button></div>
      {isOpen && createPortal(<div className="fixed z-[9999] w-[270px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-lg border border-gray-200 overflow-hidden font-sans" style={{ top: coords.top, left: coords.left }} onClick={(e) => e.stopPropagation()}><div className="p-3"><div className="flex items-center justify-between mb-2"><span className="text-[13px] font-semibold text-gray-700">Set dates</span><span className="text-[11px] text-gray-500">{daysSelected} days selected</span></div><div className="flex items-center gap-2 mb-3"><input type="text" readOnly value={formatInputDate(startDate)} className="w-1/2 border border-gray-300 rounded px-2 py-1 text-center text-[12px] text-gray-700 focus:border-blue-500 outline-none" placeholder="Start" /><input type="text" readOnly value={formatInputDate(endDate)} className="w-1/2 border border-gray-300 rounded px-2 py-1 text-center text-[12px] text-gray-700 focus:border-blue-500 outline-none" placeholder="End" /></div><div className="flex items-center justify-between mb-2 px-1"><button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={16} /></button><div className="text-[14px] font-medium text-gray-700 flex gap-1 cursor-pointer"><span>{viewDate.toLocaleDateString('en-US', { month: 'short' })}</span> <span>{year}</span><ChevronDown size={14} className="mt-1 opacity-50" /></div><button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={16} /></button></div><div className="grid grid-cols-7 gap-y-1 mb-2">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <div key={day} className="text-center text-[11px] text-gray-400 font-medium py-1">{day}</div>)}{Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`} className="h-7"></div>)}{Array.from({ length: daysInMonth }).map((_, i) => { const day = i + 1; return <button key={day} onClick={() => handleDateClick(day)} className={`h-7 w-full flex items-center justify-center text-[12px] ${getDayClass(day)}`}>{day}</button>; })}</div></div></div>, document.body)}
    </>
  );
};

const StatusCell = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const valKey = typeof value === 'object' ? value?.label : value;
  const config = options[valKey] || options[''] || { label: valKey || "", bg: "#c4c4c4" };
  const handleToggle = (e) => { e.stopPropagation(); if (!isOpen && buttonRef.current) { const rect = buttonRef.current.getBoundingClientRect(); setCoords({ top: rect.bottom + 10, left: rect.left + (rect.width / 2) - 110 }); } setIsOpen(!isOpen); };
  useEffect(() => { const h = () => setIsOpen(false); if (isOpen) { window.addEventListener('scroll', h, true); window.addEventListener('resize', h); window.addEventListener('click', h); } return () => { window.removeEventListener('scroll', h, true); window.removeEventListener('resize', h); window.removeEventListener('click', h); }; }, [isOpen]);
  return (
    <>
      <div className="w-full h-[34px] flex items-center justify-center px-1"><button ref={buttonRef} onClick={handleToggle} className="w-full text-center h-full text-white text-[13px] font-medium flex items-center justify-center hover:opacity-90 transition-opacity truncate px-1 shadow-sm rounded-sm" style={{ backgroundColor: config.bg }}>{config.label || valKey}</button></div>
      {isOpen && createPortal(<div className="fixed z-[9999] w-[220px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] rounded-lg border border-gray-100 overflow-hidden py-3 font-sans" style={{ top: coords.top, left: coords.left }} onClick={(e) => e.stopPropagation()}><div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45 z-0"></div><div className="relative z-10 bg-white"><div className="px-3 space-y-1.5 flex flex-col items-center max-h-[250px] overflow-y-auto">{Object.entries(options).filter(([k]) => k !== '').map(([key, opt]) => (<button key={key} onClick={() => { onChange(key); setIsOpen(false); }} className="w-full h-[32px] text-white text-[13px] font-medium rounded flex items-center justify-center hover:brightness-95 shadow-sm" style={{ backgroundColor: opt.bg }}>{opt.label}</button>))}<button onClick={() => { onChange(''); setIsOpen(false); }} className="w-full h-[32px] bg-[#c4c4c4] text-white text-[13px] font-medium rounded flex items-center justify-center hover:brightness-95 shadow-sm"></button></div><div className="h-px bg-gray-200 my-3 mx-3"></div><div className="px-1 space-y-1"><button className="w-full px-4 py-2 text-left text-[13px] text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-3"><Edit size={14} className="text-gray-500" /><span>Edit Labels</span></button><button className="w-full px-4 py-2 text-left text-[13px] text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-3"><Sparkles size={14} className="text-purple-500 fill-purple-100" /><span>Auto-assign labels</span></button></div></div></div>, document.body)}
    </>
  );
};

const SubitemTable = () => <div className="w-full bg-[#f7f9fb] pl-10 pr-2 py-2 flex flex-col relative"><div className="absolute left-0 top-0 bottom-0 w-[6px] bg-inherit border-l-4 border-l-orange-400 opacity-30"></div><div className="bg-white border text-[13px] shadow-sm rounded-sm overflow-hidden border-gray-200 p-2 text-center text-gray-400">Subitems go here</div></div>;

const HeaderCell = ({ id, title, type, activeMenu, setActiveMenu, onRename, onDelete, onDuplicate, onAddToRight }) => {
  const [isTitleHovered, setIsTitleHovered] = useState(false); const [isEditing, setIsEditing] = useState(false); const [editValue, setEditValue] = useState(title); const inputRef = useRef(null); const menuButtonRef = useRef(null);
  useEffect(() => { if (isEditing && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); } }, [isEditing]);
  const handleSaveRename = () => { if (editValue.trim() && editValue !== title) onRename?.(id, editValue.trim()); setIsEditing(false); };
  return (
    <div className="relative h-full w-full flex items-center justify-center px-2 group">
      <div className="flex items-center gap-1">
        <div className="relative flex items-center justify-center cursor-pointer" onMouseEnter={() => setIsTitleHovered(true)} onMouseLeave={() => setIsTitleHovered(false)} onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input ref={inputRef} type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={handleSaveRename} onKeyDown={(e) => e.key === "Enter" && handleSaveRename()} className="px-2 py-1 border-2 border-blue-500 rounded text-sm font-medium focus:outline-none min-w-[100px]" />
          ) : (
            <div className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors ${isTitleHovered ? "bg-gray-100 border border-gray-300" : "border border-transparent"}`}>
              <span className="whitespace-nowrap">{title}</span>
            </div>
          )}
        </div>
        {!isEditing && (<button ref={menuButtonRef} className={`p-1 hover:bg-gray-200 rounded text-gray-500 transition-opacity ml-1 ${activeMenu === id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === id ? null : id); }}><MoreHorizontal size={16} /></button>)}
      </div>
      {activeMenu === id && (<ColumnMenu columnId={id} title={title} triggerRef={menuButtonRef} onClose={() => setActiveMenu(null)} onRename={() => { setActiveMenu(null); setIsEditing(true); }} onDelete={onDelete} onDuplicate={onDuplicate} onAddToRight={onAddToRight} />)}
    </div>
  );
};

// ==========================================
// SUMMARY ROW COMPONENTS (Advanced Logic)
// ==========================================

const StatusSummary = ({ data, colId, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('all'); // 'all' or 'done'
  const buttonRef = useRef(null);

  const stats = useMemo(() => {
    const counts = {};
    let total = 0;
    data.forEach(row => {
      const val = row[colId] || '';
      counts[val] = (counts[val] || 0) + 1;
      total++;
    });
    return { counts, total };
  }, [data, colId]);

  const doneCount = stats.counts['Done'] || 0;
  const donePercent = Math.round((doneCount / stats.total) * 100) || 0;

  return (
    <div className="w-full h-full flex items-center justify-center px-2 relative group/sum">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-6 rounded-full overflow-hidden flex border border-gray-200 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        {mode === 'all' ? (
          Object.entries(stats.counts).map(([key, count]) => (
            <div
              key={key}
              style={{ width: `${(count / stats.total) * 100}%`, backgroundColor: options[key]?.bg || '#c4c4c4' }}
              className="h-full"
              title={`${key}: ${count}`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-600">
            {donePercent}% Done
          </div>
        )}
      </button>

      {isOpen && createPortal(
        <div
          className="fixed z-[9999] bg-white shadow-xl border border-gray-200 rounded-lg p-1 w-44 font-sans"
          style={{
            top: buttonRef.current?.getBoundingClientRect().bottom + 4,
            left: buttonRef.current?.getBoundingClientRect().left - 44
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setMode('all'); setIsOpen(false); }}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
          >
            <span>All Labels</span>
            {mode === 'all' && <Check size={14} className="text-blue-500" />}
          </button>
          <button
            onClick={() => { setMode('done'); setIsOpen(false); }}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
          >
            <span>What's Done</span>
            {mode === 'done' && <Check size={14} className="text-blue-500" />}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

const TimelineSummary = ({ data, colId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('range');
  const buttonRef = useRef(null);

  const range = useMemo(() => {
    const dates = data.filter(r => r[colId]?.start).map(r => ({
      start: new Date(r[colId].start),
      end: new Date(r[colId].end || r[colId].start)
    }));
    if (dates.length === 0) return null;
    const min = new Date(Math.min(...dates.map(d => d.start)));
    const max = new Date(Math.max(...dates.map(d => d.end)));
    return { min, max };
  }, [data, colId]);

  if (!range) return <div className="text-gray-300">-</div>;

  const displayLabel = () => {
    if (displayMode === 'earliest') return range.min.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (displayMode === 'latest') return range.max.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${range.min.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${range.max.getDate()}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4 relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="h-6 w-full max-w-[140px] rounded-full bg-[#579bfc] text-white text-[11px] font-medium flex items-center justify-center truncate px-2 hover:bg-[#468afc] transition-colors"
      >
        {displayLabel()}
      </button>
      {isOpen && createPortal(
        <div
          className="fixed z-[9999] bg-white shadow-xl border border-gray-200 p-1 w-48 rounded-lg font-sans"
          style={{
            top: buttonRef.current?.getBoundingClientRect().bottom + 4,
            left: buttonRef.current?.getBoundingClientRect().left - 48
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {['range', 'earliest', 'latest'].map(m => (
            <button
              key={m}
              onClick={() => { setDisplayMode(m); setIsOpen(false); }}
              className="w-full text-left p-2 hover:bg-gray-50 text-sm capitalize flex justify-between rounded"
            >
              {m === 'range' ? 'Earliest to Latest' : m}
              {displayMode === m && <Check size={14} className="text-blue-500" />}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

const NumericSummary = ({ data, colId, columnUnit, columnUnitPosition, onUpdateColumnUnit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unit, setUnit] = useState(columnUnit || 'None');
  const [customUnit, setCustomUnit] = useState(columnUnit && !['None', '$', '€', '£', '%'].includes(columnUnit) ? columnUnit : '');
  const [pos, setPos] = useState(columnUnitPosition || 'R');
  const [calc, setCalc] = useState('Sum');
  const buttonRef = useRef(null);

  const result = useMemo(() => {
    const nums = data.map(r => parseFloat(r[colId])).filter(n => !isNaN(n));
    if (nums.length === 0) return 0;
    if (calc === 'Sum') return nums.reduce((a, b) => a + b, 0);
    if (calc === 'Average') return nums.reduce((a, b) => a + b, 0) / nums.length;
    if (calc === 'Max') return Math.max(...nums);
    if (calc === 'Min') return Math.min(...nums);
    if (calc === 'Count') return nums.length;
    return 0;
  }, [data, colId, calc]);

  const activeUnit = unit === 'Type your own' ? customUnit : (unit === 'None' ? '' : unit);
  const formattedResult = Math.round(result * 100) / 100;

  const handleUnitChange = () => {
    if (onUpdateColumnUnit) {
      const finalUnit = unit === 'Type your own' ? customUnit : (unit === 'None' ? '' : unit);
      onUpdateColumnUnit(colId, { unit: finalUnit, unitPosition: pos });
    }
  };

  useEffect(() => {
    handleUnitChange();
  }, [unit, customUnit, pos]);

  const formatDisplayValue = (val) => {
    if (activeUnit) {
      if (pos === 'L') {
        return `${activeUnit}${val}`;
      } else {
        return `${val}${activeUnit}`;
      }
    }
    return `${val}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex flex-col items-center hover:bg-gray-50 rounded px-2 py-1 transition-colors min-w-[60px]"
      >
        <span className="text-[13px] font-medium text-[#323338]">
          {formatDisplayValue(formattedResult)}
        </span>
        <span className="text-[10px] text-gray-400 uppercase leading-none mt-0.5">
          {calc.toLowerCase()}
        </span>
      </div>
      {isOpen && createPortal(
        <div
          className="fixed z-[9999] bg-white shadow-2xl border border-gray-200 rounded-lg p-4 w-72 flex flex-col gap-4 font-sans"
          style={{
            top: buttonRef.current?.getBoundingClientRect().bottom + 4,
            left: buttonRef.current?.getBoundingClientRect().left - 140
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="text-sm font-bold mb-2 text-gray-700">Unit</div>
            <div className="flex gap-1 flex-wrap mb-2">
              {['None', '$', '€', '£', '%'].map(u => (
                <button
                  key={u}
                  onClick={() => {
                    setUnit(u);
                    if (u !== 'Type your own') setCustomUnit('');
                  }}
                  className={`px-2 py-1 border rounded text-sm ${unit === u ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300'}`}
                >
                  {u}
                </button>
              ))}
              <input
                placeholder="Type your own"
                className="border border-gray-300 rounded px-2 py-1 text-sm flex-1 outline-none focus:border-blue-500"
                value={customUnit}
                onChange={(e) => { setUnit('Type your own'); setCustomUnit(e.target.value); }}
              />
              <div className="flex border border-gray-300 rounded overflow-hidden ml-auto">
                <button
                  onClick={() => setPos('L')}
                  className={`px-2 py-1 text-xs ${pos === 'L' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  L
                </button>
                <button
                  onClick={() => setPos('R')}
                  className={`px-2 py-1 text-xs ${pos === 'R' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                >
                  R
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold mb-2 text-gray-700">Calculation</div>
            <div className="flex gap-1 flex-wrap">
              {['Sum', 'Average', 'Median', 'Min', 'Max', 'Count'].map(c => (
                <button
                  key={c}
                  onClick={() => setCalc(c)}
                  className={`px-2 py-1 border rounded text-xs ${calc === c ? 'bg-blue-500 text-white border-blue-500' : 'bg-white border-gray-300 text-gray-700'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
            Overall {calc.toLowerCase()} of column: {formatDisplayValue(formattedResult)}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

// ==========================================
// MAIN TABLE COMPONENT
// ==========================================
const TanStackBoardTable = ({
  data, columns: propColumns, onUpdateTask, onAddTask, onAddColumn, groupColor, statusConfig, priorityConfig, onRename, onDelete, onDuplicate, onAddToRight, onUpdateColumnUnit,
}) => {
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAddColumnMenuOpen, setIsAddColumnMenuOpen] = useState(false);

  const [expandedRows, setExpandedRows] = useState(new Set());
  const addColumnButtonRef = useRef(null);

  // State to track column unit settings
  const [columnUnits, setColumnUnits] = useState(() => {
    const units = {};
    propColumns.forEach(col => {
      if (col.type === 'number') {
        units[col.id] = {
          unit: col.unit || '',
          unitPosition: col.unitPosition || 'R'
        };
      }
    });
    return units;
  });

  const toggleRowExpanded = (rowId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) newExpanded.delete(rowId); else newExpanded.add(rowId);
    setExpandedRows(newExpanded);
  };

  // Update column units when propColumns change
  useEffect(() => {
    const newUnits = { ...columnUnits };
    let changed = false;

    propColumns.forEach(col => {
      if (col.type === 'number') {
        if (!newUnits[col.id]) {
          newUnits[col.id] = {
            unit: col.unit || '',
            unitPosition: col.unitPosition || 'R'
          };
          changed = true;
        }
      }
    });

    if (changed) {
      setColumnUnits(newUnits);
    }
  }, [propColumns]);

  const handleUpdateColumnUnit = (columnId, { unit, unitPosition }) => {
    setColumnUnits(prev => ({
      ...prev,
      [columnId]: { unit, unitPosition }
    }));

    if (onUpdateColumnUnit) {
      onUpdateColumnUnit(columnId, { unit, unitPosition });
    }
  };

  // --- SUM CALCULATION ---
  const columnSums = useMemo(() => {
    const sums = {};
    propColumns.forEach(col => {
      if (col.type === 'number') {
        const total = data.reduce((acc, row) => {
          const val = parseFloat(row[col.id]);
          return !isNaN(val) ? acc + val : acc;
        }, 0);
        sums[col.id] = total;
      }
    });
    return sums;
  }, [data, propColumns]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => {
    const cols = [
      columnHelper.display({
        id: "select",
        header: () => <div className="cursor-pointer w-full h-full flex items-center justify-center group"><div className="w-4 h-4 border border-gray-300 rounded-[3px] bg-white group-hover:border-blue-400"></div></div>,
        cell: () => <div className="w-full h-full flex items-center justify-center group bg-white"><input type="checkbox" className="w-4 h-4 border-gray-300 rounded-[3px] cursor-pointer opacity-0 group-hover:opacity-100 checked:opacity-100" /></div>,
        size: 36,
        enableResizing: false
      }),
    ];

    propColumns.forEach((col) => {
      cols.push(columnHelper.accessor(col.id, {
        header: () => <HeaderCell title={col.title} type={col.type} id={col.id} activeMenu={activeMenu} setActiveMenu={setActiveMenu} onRename={onRename} onDelete={onDelete} onDuplicate={onDuplicate} onAddToRight={onAddToRight} />,
        cell: (info) => {
          const val = info.getValue();
          const rowOriginal = info.row.original;

          if (col.id === "name") {
            return (
              <TaskNameCell
                value={val}
                rowId={rowOriginal.id}
                onUpdate={(newVal) => onUpdateTask(rowOriginal.id, 'name', newVal)}
                toggleExpanded={() => toggleRowExpanded(rowOriginal.id)}
                isExpanded={expandedRows.has(rowOriginal.id)}
              />
            );
          }

          if (col.type === "status") {
            const optionsToUse = col.id === 'priority' ? priorityConfig : statusConfig;
            return <StatusCell value={val} options={optionsToUse || {}} onChange={(newVal) => onUpdateTask(rowOriginal.id, col.id, newVal)} />;
          }
          if (col.type === "date") return <DateCell value={val} onChange={(newDate) => onUpdateTask(rowOriginal.id, col.id, newDate)} />;
          if (col.type === "timeline") return <TimelineCell value={val} onChange={(newRange) => onUpdateTask(rowOriginal.id, col.id, newRange)} />;
          if (col.type === "file") return <FileCell value={val} onChange={(newFile) => onUpdateTask(rowOriginal.id, col.id, newFile)} />;
          if (col.type === "email") return <EmailCell value={val} onChange={(newEmail) => onUpdateTask(rowOriginal.id, col.id, newEmail)} />;
          if (col.type === "person") {
            return (<div className="w-full h-full flex items-center justify-center">{val && typeof val === "object" ? (<img src={val.avatar || "https://cdn1.monday.com/dapulse_default_photo.png"} alt="owner" className="w-6 h-6 rounded-full border border-white shadow-sm" title={val.name} />) : (<div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"></div>)}</div>);
          }
          if (col.type === "number") {
            const unitSettings = columnUnits[col.id] || {};
            return <NumberCell
              value={val}
              onChange={(newVal) => onUpdateTask(rowOriginal.id, col.id, newVal)}
              columnId={col.id}
              columnUnit={unitSettings.unit || ''}
              columnUnitPosition={unitSettings.unitPosition || 'R'}
            />;
          }
          if (col.type === 'text' || col.id === 'notes') return <TextCell value={val} onChange={(newText) => onUpdateTask(rowOriginal.id, col.id, newText)} />;
          if (col.type === "lastUpdated") return <div className="w-full h-full flex items-center justify-center gap-2"><div className="w-6 h-6 bg-[#e6e9ef] rounded-full flex items-center justify-center"><User size={12} className="text-gray-500" /></div><span className="text-[12px] text-gray-500">2h ago</span></div>;
          return <div className="w-full h-full px-2 flex items-center text-[13px] text-[#323338] truncate">{typeof val === 'object' && val !== null ? JSON.stringify(val) : (val || "")}</div>;
        },
        size: col.width || 140,
      }));
    });

    cols.push(columnHelper.display({
      id: "add",
      header: () => (
        <div className="relative w-full h-full flex items-center justify-center border-t border-transparent hover:bg-gray-50 transition-colors">
          <button ref={addColumnButtonRef} onClick={(e) => { e.stopPropagation(); setIsAddColumnMenuOpen(!isAddColumnMenuOpen); }} className="w-full h-full flex items-center justify-center">
            <Plus size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
          {isAddColumnMenuOpen && <AddColumnMenu triggerRef={addColumnButtonRef} onClose={() => setIsAddColumnMenuOpen(false)} onAddColumn={(type) => { onAddColumn(type); setIsAddColumnMenuOpen(false); }} />}
        </div>
      ),
      cell: () => null,
      size: 48,
      enableResizing: false
    }));
    return cols;
  }, [propColumns, hoveredHeader, activeMenu, statusConfig, priorityConfig, onUpdateTask, isAddColumnMenuOpen, onAddColumn, expandedRows, columnUnits]);

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-auto custom-scrollbar bg-white">
      {/* Full-width container for Monday.com style */}
      <div className="min-w-full bg-white relative">
        <div className="sticky left-0 top-0 bottom-0 w-[6px] z-[30] rounded-l-md" style={{ backgroundColor: groupColor, height: '100%', position: 'absolute' }} />

        <div className="flex bg-white pl-[6px] min-w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const isSticky = index < 2; // Select and Task Name
                const leftPos = index === 0 ? 0 : 36;
                return (
                  <div
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                      borderRight: "1px solid #d0d4e4",
                      left: isSticky ? leftPos : undefined,
                      zIndex: isSticky ? 25 : 10
                    }}
                    className={`h-9 border-t border-b border-[#d0d4e4] flex-shrink-0 relative bg-white ${isSticky ? "sticky left-0" : ""}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                );
              })}
              {/* Flex spacer to fill remaining width */}
              <div className="flex-1 min-w-0 h-9 border-t border-b border-[#d0d4e4] bg-white" />
            </React.Fragment>
          ))}
        </div>

        {/* DATA ROWS */}
        <div className="flex flex-col pl-[6px]">
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <div className="flex border-b border-[#d0d4e4] hover:bg-[#f5f7f9] bg-white h-[36px] group/row transition-colors min-w-full">
                {row.getVisibleCells().map((cell, index) => {
                  const isSticky = index < 2;
                  const leftPos = index === 0 ? 0 : 36;
                  return (
                    <div
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        borderRight: "1px solid #d0d4e4",
                        left: isSticky ? leftPos : undefined,
                        zIndex: isSticky ? 20 : 1
                      }}
                      className={`flex-shrink-0 h-full flex items-center relative bg-inherit ${isSticky ? "sticky left-0 bg-white group-hover/row:bg-[#f5f7f9]" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  );
                })}
                {/* Flex spacer to fill remaining width */}
                <div className="flex-1 min-w-0 h-full bg-inherit" />
              </div>
              {expandedRows.has(row.original.id) && <div className="border-b border-[#d0d4e4] sticky left-0 z-10"><SubitemTable /></div>}
            </React.Fragment>
          ))}


          {/* ADD TASK ROW */}
          <div className="flex h-[36px] items-center border-b border-[#d0d4e4] hover:bg-[#f5f7f9] cursor-text bg-white group/add min-w-full">
            {/* Sticky spacer and Task Input */}
            <div style={{ width: 36, left: 0, zIndex: 20 }} className="sticky left-0 bg-white group-hover/add:bg-[#f5f7f9] border-r border-[#d0d4e4] h-full flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 border border-gray-200 rounded-[3px] bg-white"></div>
            </div>
            <div
              style={{
                width: propColumns.find((c) => c.id === "name")?.width || 200,
                minWidth: propColumns.find((c) => c.id === "name")?.width || 200,
                left: 36,
                zIndex: 20
              }}
              className="sticky left-[36px] bg-white group-hover/add:bg-[#f5f7f9] border-r border-[#d0d4e4] h-full flex items-center flex-shrink-0"
            >
              <input
                type="text"
                placeholder="+ Add task"
                className="w-full bg-transparent border-none outline-none text-[13px] px-2 text-gray-500 placeholder-gray-500 h-full font-normal group-hover/add:placeholder-gray-700"
                onKeyDown={(e) => { if (e.key === "Enter") { onAddTask(e.target.value); e.target.value = ""; } }}
              />
            </div>
            {/* Empty space for other columns */}
            {propColumns.filter((c) => c.id !== "name").map((col, idx) => (
              <div key={`spacer-${idx}`} style={{ width: col.width || 140, minWidth: col.width || 140 }} className="h-full border-r border-[#d0d4e4] flex-shrink-0" />
            ))}
            <div style={{ width: 48, minWidth: 48 }} className="h-full flex-shrink-0 bg-white border-r border-[#d0d4e4]" />
            {/* Flex spacer to fill remaining width */}
            <div className="flex-1 min-w-0 h-full bg-inherit" />
          </div>

          {/* --- SUM / SUMMARY ROW (Advanced) --- */}
          <div className="flex bg-white h-[44px] border-b border-[#d0d4e4] group/summary min-w-full">
            {/* select spacer - Sticky */}
            <div style={{ width: 36, left: 0, zIndex: 20 }} className="border-r border-[#d0d4e4] h-full flex-shrink-0 bg-white sticky left-0" />

            {/* Task Name Column - Sticky */}
            <div
              style={{
                width: propColumns.find((c) => c.id === "name")?.width || 200,
                minWidth: propColumns.find((c) => c.id === "name")?.width || 200,
                left: 36,
                zIndex: 20
              }}
              className="sticky left-[36px] bg-white border-r border-[#d0d4e4] h-full flex items-center justify-center flex-shrink-0"
            >
              <div className="text-[10px] text-gray-400 uppercase">Summary</div>
            </div>

            {/* Other columns */}
            {propColumns.filter((c) => c.id !== "name").map((col, idx) => {
              const isNumber = col.type === 'number';
              const isStatus = col.type === 'status';
              const isTimeline = col.type === 'timeline';
              const isEmail = col.type === 'email';

              return (
                <div
                  key={`summary-${idx}`}
                  style={{
                    width: col.width || 140,
                    minWidth: col.width || 140,
                    borderRight: "1px solid #d0d4e4"
                  }}
                  className="h-full flex items-center justify-center flex-shrink-0 bg-white"
                >
                  {isStatus && (
                    <StatusSummary
                      data={data}
                      colId={col.id}
                      options={col.id === 'priority' ? priorityConfig : statusConfig}
                    />
                  )}
                  {isTimeline && (
                    <TimelineSummary
                      data={data}
                      colId={col.id}
                    />
                  )}
                  {isNumber && (
                    <NumericSummary
                      data={data}
                      colId={col.id}
                      columnUnit={columnUnits[col.id]?.unit || ''}
                      columnUnitPosition={columnUnits[col.id]?.unitPosition || 'R'}
                      onUpdateColumnUnit={handleUpdateColumnUnit}
                    />
                  )}
                  {isEmail && (
                    <div className="text-[10px] text-gray-400 uppercase">-</div>
                  )}
                  {!isStatus && !isTimeline && !isNumber && !isEmail && (
                    <div className="text-[10px] text-gray-400 uppercase">-</div>
                  )}
                </div>
              )
            })}
            <div style={{ width: 48, minWidth: 48 }} className="h-full flex-shrink-0 bg-white border-r border-[#d0d4e4]" />
            {/* Flex spacer to fill remaining width */}
            <div className="flex-1 min-w-0 h-full bg-inherit" />
          </div>
        </div>
      </div>

      {/* Portal for Add Column Menu */}
      {isAddColumnMenuOpen && createPortal(
        <AddColumnMenu
          triggerRef={addColumnButtonRef}
          onClose={() => setIsAddColumnMenuOpen(false)}
          onAddColumn={(type) => {
            if (typeof onAddColumn === 'function') onAddColumn(type);
            setIsAddColumnMenuOpen(false);
          }}
        />,
        document.body
      )}
    </div>
  );
};

export default TanStackBoardTable;