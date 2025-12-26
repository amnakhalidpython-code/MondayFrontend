import React, { useState, useMemo, useRef, useEffect } from "react";
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
  Info,
  Maximize2,
  MessageSquarePlus,
  Flag,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import ColumnMenu from "./ColumnMenu";
import AddColumnMenu from "./AddColumnMenu";

// Status Cell Component (reused logic)
const StatusCell = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = options[value] || { label: "", bg: "#c4c4c4" };

  return (
    <div className="relative w-full h-[34px] flex items-center justify-center px-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-center h-full text-white text-[13px] font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
        style={{ backgroundColor: config.bg }}
      >
        {config.label}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-[160px] bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-100">
            {Object.entries(options).map(([key, opt]) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-[13px] hover:bg-gray-100 flex items-center gap-2 transition-colors"
              >
                <div
                  className="w-6 h-6 rounded flex-shrink-0"
                  style={{ backgroundColor: opt.bg }}
                />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Subitem Table Component
const SubitemTable = () => {
  return (
    <div className="w-full bg-[#f7f9fb] pl-10 pr-2 py-2 flex flex-col relative">
      {/* Subitem Orange Line Connection - mimicked with absolute positioning if needed, or just left border */}
      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-inherit border-l-4 border-l-orange-400 opacity-30"></div>

      {/* Use a simpler grid for subitems as per screenshot */}
      <div className="bg-white border text-[13px] shadow-sm rounded-sm overflow-hidden border-gray-200">
        {/* Headers */}
        <div className="flex border-b border-gray-200 bg-white text-gray-500">
          <div className="flex-1 w-[300px] px-3 py-2 border-r border-gray-200 font-normal">
            Subitem
          </div>
          <div className="w-[100px] px-3 py-2 border-r border-gray-200 text-center font-normal">
            Owner
          </div>
          <div className="w-[120px] px-3 py-2 border-r border-gray-200 text-center font-normal">
            Status
          </div>
          <div className="w-[120px] px-3 py-2 border-r border-gray-200 text-center font-normal">
            Date
          </div>
          <div className="w-[40px] flex items-center justify-center">
            <Plus size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Add Subitem Row */}
        <div className="flex bg-[#e6f4ff] hover:bg-[#dbeeff] transition-colors group">
          {/* Input Area */}
          <div className="flex-1 w-[300px] p-1 border-r border-transparent">
            <input
              type="text"
              placeholder="+ Add subitem"
              className="w-full h-[28px] px-2 bg-white border border-red-500 rounded text-[13px] outline-none placeholder-gray-500 focus:border-blue-400 transition-all shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  console.log("Adding subitem:", e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
          {/* Empty Cells */}
          <div className="w-[100px] border-r border-transparent"></div>
          <div className="w-[120px] border-r border-transparent"></div>
          <div className="w-[120px] border-r border-transparent"></div>
          <div className="w-[40px]"></div>
        </div>
      </div>
    </div>
  );
};

// Header Cell Component to manage its own hover state for the tooltip/pill
const HeaderCell = ({
  id,
  title,
  type,
  activeMenu,
  setActiveMenu,
  onSort,
  onFilter,
  onGroupBy,
  onRename,
  onDelete,
  onDuplicate,
  onAddToRight,
}) => {
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveRename = () => {
    if (editValue.trim() && editValue !== title) {
      onRename?.(id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveRename();
    } else if (e.key === "Escape") {
      setEditValue(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center px-2 group">
      <div className="flex items-center gap-1">
        {/* Column Drag/Tooltip Container */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
          onClick={() => setIsEditing(true)}
        >
          {/* Tooltip */}
          {isTitleHovered && !isEditing && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#323338] text-white text-xs rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-100 flex items-center justify-center">
              {title}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#323338]"></div>
            </div>
          )}

          {/* Editable Title */}
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSaveRename}
              onKeyDown={handleKeyDown}
              className="px-2 py-1 border-2 border-blue-500 rounded text-sm font-medium focus:outline-none min-w-[100px]"
              style={{ width: `${Math.max(editValue.length * 8 + 20, 100)}px` }}
            />
          ) : (
            <div
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors ${
                isTitleHovered
                  ? "bg-gray-100 border border-gray-300"
                  : "border border-transparent"
              }`}
            >
              {type === "person" && <User size={14} />}
              <span>{title}</span>
            </div>
          )}
        </div>

        {type !== "text" && !isEditing && (
          <Info size={13} className="text-gray-400 ml-0.5" />
        )}

        {/* Three Dots Menu - Visible on Header Hover */}
        {!isEditing && (
          <button
            ref={menuButtonRef}
            className={`p-1 hover:bg-gray-200 rounded text-gray-500 transition-opacity ml-1 ${
              activeMenu === id
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === id ? null : id);
            }}
          >
            <MoreHorizontal size={16} />
          </button>
        )}
      </div>

      {activeMenu === id && (
        <ColumnMenu
          columnId={id}
          title={title}
          triggerRef={menuButtonRef}
          onClose={() => setActiveMenu(null)}
          onSort={onSort}
          onFilter={onFilter}
          onGroupBy={onGroupBy}
          onRename={() => {
            setActiveMenu(null);
            setIsEditing(true);
          }}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onAddToRight={onAddToRight}
        />
      )}
    </div>
  );
};

const TanStackBoardTable = ({
  data,
  columns: propColumns,
  onUpdateTask,
  onAddTask,
  onAddColumn,
  groupColor,
  statusConfig,
  onSort,
  onFilter,
  onGroupBy,
  onRename,
  onDelete,
  onDuplicate,
  onAddToRight,
}) => {
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAddColumnMenuOpen, setIsAddColumnMenuOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const addColumnButtonRef = useRef(null);

  const toggleRowExpanded = (rowId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => {
    // Checkbox Column
    const cols = [
      columnHelper.display({
        id: "select",
        header: () => (
          <div className="cursor-pointer w-full h-full flex items-center justify-center group  cursor-pointer">
            <div className="w-4 h-4 border border-gray-300 rounded-[3px] bg-white group-hover:border-blue-400 transition-colors"></div>
          </div>
        ),
        cell: () => (
          <div className="w-full h-full flex items-center justify-center group bg-white">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded-[3px] text-blue-600 focus:ring-offset-0 focus:ring-0 cursor-pointer opacity-0 group-hover:opacity-100 checked:opacity-100 transition-opacity"
            />
          </div>
        ),
        size: 36,
        enableResizing: false,
      }),
    ];

    // Dynamic Columns
    propColumns.forEach((col) => {
      cols.push(
        columnHelper.accessor(col.id, {
          header: () => (
            <HeaderCell
              title={col.title}
              type={col.type}
              id={col.id}
              setHoveredHeader={setHoveredHeader}
              hoveredHeader={hoveredHeader}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              columnId={col.id}
              onSort={onSort}
              onFilter={onFilter}
              onGroupBy={onGroupBy}
              onRename={onRename}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onAddToRight={onAddToRight}
            />
          ),
          cell: (info) => {
            const val = info.getValue();
            const rowOriginal = info.row.original;

            if (col.id === "name") {
              const isExpanded = expandedRows.has(rowOriginal.id);
              return (
                <div className="flex items-center justify-between px-2 h-full group/cell w-full relative overflow-hidden">
                  <div className="flex items-center gap-1 text-[13px] text-[#323338] min-w-0 flex-1">
                    {/* Chevron for expand/collapse */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpanded(rowOriginal.id);
                      }}
                      className={`p-0.5 rounded-sm hover:bg-gray-200 text-gray-500 mr-1 transition-transform flex-shrink-0 ${
                        isExpanded ? "" : "-rotate-90"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </button>
                    <span className="truncate flex-1 font-normal min-w-0">
                      {val || "Item"}
                    </span>
                  </div>

                  {/* Floating Action Icons on Hover */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover/row:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm pl-2 flex-shrink-0">
                    <button
                      className="p-1 hover:bg-gray-200 rounded text-gray-500 flex-shrink-0"
                      title="Start Conversation"
                    >
                      <MessageSquarePlus size={15} />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-200 rounded text-gray-500 flex-shrink-0"
                      title="Open Item"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              );
            }

            if (col.type === "status") {
              return (
                <StatusCell
                  value={val}
                  options={statusConfig}
                  onChange={(newVal) =>
                    onUpdateTask(rowOriginal.id, col.id, newVal)
                  }
                />
              );
            }

            if (col.type === "email") {
              const [isEditing, setIsEditing] = React.useState(false);
              const [editValue, setEditValue] = React.useState(val || "");
              const inputRef = React.useRef(null);

              React.useEffect(() => {
                if (isEditing && inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.select();
                }
              }, [isEditing]);

              const handleSave = () => {
                if (editValue !== val) {
                  onUpdateTask(rowOriginal.id, col.id, editValue);
                }
                setIsEditing(false);
              };

              if (isEditing) {
                return (
                  <input
                    ref={inputRef}
                    type="email"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Tab") {
                        e.preventDefault();
                        handleSave();
                      }
                      if (e.key === "Escape") {
                        setEditValue(val || "");
                        setIsEditing(false);
                      }
                    }}
                    className="w-full h-full px-2 text-[13px] text-[#0073ea] bg-white border-2 border-blue-500 rounded focus:outline-none"
                    placeholder="Enter email"
                  />
                );
              }

              return (
                <div
                  onClick={() => setIsEditing(true)}
                  className="w-full h-full px-2 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >
                  {val ? (
                    <a
                      href={`mailto:${val}`}
                      className="text-[13px] text-[#0073ea] hover:underline truncate block max-w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {val}
                    </a>
                  ) : (
                    <span className="text-[13px] text-gray-400 truncate">
                      Click to add email
                    </span>
                  )}
                </div>
              );
            }

            if (col.type === "phone") {
              const [isEditing, setIsEditing] = React.useState(false);
              const [editValue, setEditValue] = React.useState(val || "");
              const inputRef = React.useRef(null);

              React.useEffect(() => {
                if (isEditing && inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.select();
                }
              }, [isEditing]);

              const handleSave = () => {
                if (editValue !== val) {
                  onUpdateTask(rowOriginal.id, col.id, editValue);
                }
                setIsEditing(false);
              };

              if (isEditing) {
                return (
                  <input
                    ref={inputRef}
                    type="tel"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Tab") {
                        e.preventDefault();
                        handleSave();
                      }
                      if (e.key === "Escape") {
                        setEditValue(val || "");
                        setIsEditing(false);
                      }
                    }}
                    className="w-full h-full px-2 text-[13px] text-[#323338] bg-white border-2 border-blue-500 rounded focus:outline-none"
                    placeholder="Enter phone"
                  />
                );
              }

              return (
                <div
                  onClick={() => setIsEditing(true)}
                  className="w-full h-full px-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >
                  {val ? (
                    <>
                      <span className="text-lg leading-none flex-shrink-0">
                        🇺🇸
                      </span>
                      <span className="text-[13px] text-[#323338] truncate min-w-0">
                        {val}
                      </span>
                    </>
                  ) : (
                    <span className="text-[13px] text-gray-400 truncate">
                      Click to add phone
                    </span>
                  )}
                </div>
              );
            }

            if (col.title.includes("$")) {
              return (
                <div className="px-2 text-[13px] text-[#323338] text-center w-full truncate overflow-hidden">
                  {val ? `$${Number(val).toLocaleString()}` : ""}
                </div>
              );
            }

            if (col.id === "donations") {
              return (
                <div className="flex items-center justify-center w-full h-full px-4 text-center">
                  {val ? (
                    <div className="flex items-center gap-2 w-full justify-center">
                      <div className="w-1.5 h-4 bg-[#579BFC] rounded-full"></div>
                      <span className="text-[13px] text-[#323338]">{val}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 w-full justify-center opacity-50">
                      <div className="w-1 h-3 bg-[#579BFC] rounded-full"></div>
                      <span className="text-[13px] text-[#323338]">-</span>
                    </div>
                  )}
                </div>
              );
            }

            // Default text cell - make it editable
            if (col.type === "text" || !col.type) {
              const [isEditing, setIsEditing] = React.useState(false);
              const [editValue, setEditValue] = React.useState(val || "");
              const inputRef = React.useRef(null);

              React.useEffect(() => {
                if (isEditing && inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.select();
                }
              }, [isEditing]);

              const handleSave = () => {
                if (editValue !== val) {
                  onUpdateTask(rowOriginal.id, col.id, editValue);
                }
                setIsEditing(false);
              };

              if (isEditing) {
                return (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Tab") {
                        e.preventDefault();
                        handleSave();
                      }
                      if (e.key === "Escape") {
                        setEditValue(val || "");
                        setIsEditing(false);
                      }
                    }}
                    className="w-full h-full px-2 text-[13px] text-[#323338] bg-white border-2 border-blue-500 rounded focus:outline-none"
                    placeholder="Enter value"
                  />
                );
              }

              return (
                <div
                  onClick={() => setIsEditing(true)}
                  className="w-full h-full px-2 flex items-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >
                  {val ? (
                    <span className="text-[13px] text-[#323338] truncate block max-w-full">
                      {val}
                    </span>
                  ) : (
                    <span className="text-[13px] text-gray-400 truncate">
                      Click to add
                    </span>
                  )}
                </div>
              );
            }

            return (
              <div className="px-2 text-[13px] text-[#323338] truncate text-center w-full overflow-hidden">
                {val}
              </div>
            );
          },
          size: col.width || 140,
        })
      );
    });
    // Add Column Button
    cols.push(
      columnHelper.display({
        id: "add",
        header: () => (
          <div className="relative w-full h-full flex items-center justify-center border-t-2 border-t-transparent hover:bg-gray-50 transition-colors">
            <button
              ref={addColumnButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsAddColumnMenuOpen(!isAddColumnMenuOpen);
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <Plus
                size={16}
                className="text-gray-400 mx-auto cursor-pointer hover:text-gray-600"
              />
            </button>
            {isAddColumnMenuOpen && (
              <AddColumnMenu
                triggerRef={addColumnButtonRef}
                onClose={() => setIsAddColumnMenuOpen(false)}
                onAddColumn={(type) => {
                  onAddColumn(type);
                  setIsAddColumnMenuOpen(false);
                }}
              />
            )}
          </div>
        ),
        cell: () => null,
        size: 36,
        enableResizing: false,
      })
    );

    return cols;
  }, [
    propColumns,
    hoveredHeader,
    activeMenu,
    statusConfig,
    groupColor,
    onUpdateTask,
    isAddColumnMenuOpen,
    onAddColumn,
    expandedRows,
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 36,
      maxSize: 800,
    },
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max bg-white rounded-bl-lg border-b border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.05)] relative isolate">
        {/* Left colored styling bar for the group */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[6px] z-10 rounded-l-md"
          style={{ backgroundColor: groupColor }}
        />

        {/* Table Header */}
        <div className="flex bg-white pl-[6px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {/* Header cells */}
              {headerGroup.headers.map((header, index) => {
                const isLast = index === headerGroup.headers.length - 1;
                const isActive = activeMenu === header.column.id;
                const isHovered = hoveredHeader === header.column.id;
                const shouldShowMenu = isActive || isHovered;
                const zClass = shouldShowMenu
                  ? "z-[9998]"
                  : isLast
                  ? "z-20"
                  : "z-10";
                const overflowClass = shouldShowMenu
                  ? "overflow-visible"
                  : "overflow-hidden";

                return (
                  <div
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                      maxWidth: header.getSize(),
                      borderRight: isLast ? "none" : "1px solid #d0d4e4",
                    }}
                    className={`h-9 border-t border-b border-[#d0d4e4] flex-shrink-0 relative box-border bg-white ${overflowClass} ${zClass}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Table Body */}
        <div className="flex flex-col pl-[6px]">
          {table.getRowModel().rows.map((row) => {
            const isExpanded = expandedRows.has(row.original.id);
            return (
              <React.Fragment key={row.id}>
                {/* Main Row */}
                <div className="flex border-b border-[#d0d4e4] hover:bg-[#f5f7f9] bg-white h-[36px] group/row transition-colors">
                  {row.getVisibleCells().map((cell, index) => (
                    <div
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        borderRight:
                          index === row.getVisibleCells().length - 1
                            ? "none"
                            : "1px solid #d0d4e4",
                      }}
                      className="flex-shrink-0 h-full flex items-center relative overflow-hidden"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>

                {/* Subitem Row - Rendered if expanded */}
                {isExpanded && (
                  <div className="border-b border-[#d0d4e4]">
                    <SubitemTable />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Add Item Row */}
          <div className="flex h-[36px] items-center border-b border-[#d0d4e4] hover:bg-[#f5f7f9] cursor-text bg-white group/add">
            {/* Matches first column (checkbox) */}
            <div
              style={{ width: 36, minWidth: 36, maxWidth: 36 }}
              className="border-r border-[#d0d4e4] h-full flex items-center justify-center flex-shrink-0"
            >
              <div className="w-4 h-4 border border-gray-200 rounded-[3px] bg-white"></div>
            </div>
            {/* Matches Name column */}
            <div
              style={{
                width: propColumns.find((c) => c.id === "name")?.width || 200,
                minWidth:
                  propColumns.find((c) => c.id === "name")?.width || 200,
                maxWidth:
                  propColumns.find((c) => c.id === "name")?.width || 200,
              }}
              className="border-r border-[#d0d4e4] h-full flex items-center flex-shrink-0 overflow-hidden"
            >
              <input
                type="text"
                placeholder="+ Add donor"
                className="w-full bg-transparent border border-[#d0d4e4] outline-none text-[13px] text-gray-500 placeholder-gray-500 h-full font-normal group-hover/add:placeholder-gray-700"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onAddTask(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
            {/* Rest of spacer columns - Empty white cells to complete the row */}
            <div className="flex h-full">
              {propColumns
                .filter((c) => c.id !== "name")
                .map((col, idx) => (
                  <div
                    key={`spacer-${idx}`}
                    style={{
                      width: col.width || 140,
                      minWidth: col.width || 140,
                      maxWidth: col.width || 140,
                    }}
                    className="h-full border-r border-[#d0d4e4] flex-shrink-0 overflow-hidden"
                  />
                ))}
            </div>
            <div
              style={{ width: 36, minWidth: 36, maxWidth: 36 }}
              className="h-full flex-shrink-0"
            />
          </div>

          {/* Summary Row */}
          <div className="flex h-[40px] items-center bg-white border-b border-[#d0d4e4]">
            <div
              style={{ width: 36, minWidth: 36, maxWidth: 36 }}
              className="border-r border-[#d0d4e4] h-full flex-shrink-0"
            />
            {propColumns.map((col, index) => (
              <div
                key={col.id}
                style={{
                  width: col.width || 140,
                  minWidth: col.width || 140,
                  maxWidth: col.width || 140,
                }}
                className="border-r border-[#d0d4e4] h-full flex items-center justify-center text-[13px] flex-shrink-0 overflow-hidden"
              >
                {(col.id.includes("donated") || col.id === "grantAmount") && (
                  <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
                    <span className="font-semibold text-[#323338] leading-tight truncate">
                      $20,800
                    </span>
                    <span className="text-[10px] text-gray-500 leading-tight truncate">
                      sum
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div
              style={{ width: 36, minWidth: 36, maxWidth: 36 }}
              className="h-full flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanStackBoardTable;
