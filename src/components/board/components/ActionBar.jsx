import React, { useState, useRef, useEffect } from 'react';
import './ActionBar.css';
import {
  ChevronDown,
  ChevronUp,
  Search as SearchIcon,
  User,
  Filter,
  ArrowUpDown,
  Eye,
  EyeOff,
  Grid3x3,
  MoreHorizontal,
  Plus,
  Check,
  Pin,
  Palette,
  Settings
} from 'lucide-react';

const ActionBar = ({ 
  columns = [], 
  onSearch, 
  onFilter, 
  onSort, 
  onHideColumns, 
  onGroupBy,
  onAddTask,
  hiddenColumns = [],
  currentSort = null,
  currentGroupBy = null
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showHideDropdown, setShowHideDropdown] = useState(false);
  const [showGroupByDropdown, setShowGroupByDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showNewTaskDropdown, setShowNewTaskDropdown] = useState(false);

  const searchRef = useRef(null);
  const personRef = useRef(null);
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const hideRef = useRef(null);
  const groupByRef = useRef(null);
  const moreRef = useRef(null);
  const newTaskRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
      if (personRef.current && !personRef.current.contains(event.target)) {
        setShowPersonDropdown(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (hideRef.current && !hideRef.current.contains(event.target)) {
        setShowHideDropdown(false);
      }
      if (groupByRef.current && !groupByRef.current.contains(event.target)) {
        setShowGroupByDropdown(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
      if (newTaskRef.current && !newTaskRef.current.contains(event.target)) {
        setShowNewTaskDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };

  const handleSort = (column, order) => {
    if (onSort) onSort(column, order);
    setShowSortDropdown(false);
  };

  const handleHideColumn = (columnId) => {
    if (onHideColumns) onHideColumns(columnId);
  };

  const handleGroupBy = (column) => {
    if (onGroupBy) onGroupBy(column);
    setShowGroupByDropdown(false);
  };

  return (
    <div className="action-bar">
      <div className="action-bar-left">
        {/* New Task Button with Dropdown */}
        <div className="new-task-wrapper" ref={newTaskRef}>
          <button className="new-task-btn" onClick={() => onAddTask && onAddTask()}>
            New task
          </button>
          <button 
            className="new-task-dropdown-btn"
            onClick={() => setShowNewTaskDropdown(!showNewTaskDropdown)}
          >
            <ChevronDown size={14} />
          </button>
          
          {showNewTaskDropdown && (
            <div className="dropdown-menu new-task-dropdown">
              <div className="dropdown-item" onClick={() => onAddTask && onAddTask()}>
                <Plus size={16} />
                <span>New task</span>
              </div>
              <div className="dropdown-item">
                <Plus size={16} />
                <span>New group</span>
              </div>
            </div>
          )}
        </div>

        <div className="action-divider"></div>

        {/* Search */}
        <div className="search-wrapper" ref={searchRef}>
          {showSearchInput ? (
            <div className="search-input-container">
              <SearchIcon size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                className="search-input"
              />
            </div>
          ) : (
            <button className="action-btn" onClick={() => setShowSearchInput(true)}>
              <SearchIcon size={18} />
              <span>Search</span>
            </button>
          )}
        </div>

        {/* Person Filter */}
        <div className="action-dropdown-wrapper" ref={personRef}>
          <button 
            className="action-btn"
            onClick={() => setShowPersonDropdown(!showPersonDropdown)}
          >
            <User size={18} />
            <span>Person</span>
          </button>
          
          {showPersonDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">Filter by person</div>
              <div className="dropdown-item">
                <User size={16} />
                <span>All people</span>
              </div>
              <div className="dropdown-item">
                <User size={16} />
                <span>Assigned to me</span>
              </div>
              <div className="dropdown-item">
                <User size={16} />
                <span>Unassigned</span>
              </div>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="action-dropdown-wrapper" ref={filterRef}>
          <button 
            className="action-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Filter size={18} />
            <span>Filter</span>
            <ChevronDown size={14} />
          </button>
          
          {showFilterDropdown && (
            <div className="dropdown-menu filter-dropdown">
              <div className="dropdown-header">Filter by column</div>
              {columns.map((col) => (
                <div key={col.id} className="dropdown-item">
                  <span>{col.title}</span>
                </div>
              ))}
              <div className="dropdown-divider"></div>
              <div className="dropdown-item primary">
                <Plus size={16} />
                <span>Save as new view</span>
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="action-dropdown-wrapper" ref={sortRef}>
          <button 
            className="action-btn"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <ArrowUpDown size={18} />
            <span>Sort</span>
          </button>
          
          {showSortDropdown && (
            <div className="dropdown-menu sort-dropdown">
              <div className="dropdown-header">Sort by</div>
              {columns.map((col) => (
                <div key={col.id} className="dropdown-section">
                  <div className="dropdown-subheader">{col.title}</div>
                  <div 
                    className="dropdown-item"
                    onClick={() => handleSort(col.id, 'asc')}
                  >
                    <ArrowUpDown size={16} />
                    <span>Ascending</span>
                    {currentSort?.column === col.id && currentSort?.order === 'asc' && (
                      <Check size={16} className="check-icon" />
                    )}
                  </div>
                  <div 
                    className="dropdown-item"
                    onClick={() => handleSort(col.id, 'desc')}
                  >
                    <ArrowUpDown size={16} />
                    <span>Descending</span>
                    {currentSort?.column === col.id && currentSort?.order === 'desc' && (
                      <Check size={16} className="check-icon" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hide Columns */}
        <div className="action-dropdown-wrapper" ref={hideRef}>
          <button 
            className="action-btn"
            onClick={() => setShowHideDropdown(!showHideDropdown)}
          >
            <Eye size={18} />
            <span>Hide</span>
          </button>
          
          {showHideDropdown && (
            <div className="dropdown-menu hide-dropdown">
              <div className="dropdown-header">Choose columns</div>
              {columns.map((col) => (
                <div 
                  key={col.id} 
                  className="dropdown-item checkbox-item"
                  onClick={() => handleHideColumn(col.id)}
                >
                  <div className="checkbox">
                    {!hiddenColumns.includes(col.id) && <Check size={14} />}
                  </div>
                  <span>{col.title}</span>
                  {hiddenColumns.includes(col.id) && (
                    <EyeOff size={14} className="hidden-icon" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Group By */}
        <div className="action-dropdown-wrapper" ref={groupByRef}>
          <button 
            className="action-btn"
            onClick={() => setShowGroupByDropdown(!showGroupByDropdown)}
          >
            <Grid3x3 size={18} />
            <span>Group by</span>
          </button>
          
          {showGroupByDropdown && (
            <div className="dropdown-menu groupby-dropdown">
              <div className="dropdown-header">Group items by column</div>
              <div 
                className="dropdown-item"
                onClick={() => handleGroupBy(null)}
              >
                <span>No grouping</span>
                {!currentGroupBy && <Check size={16} className="check-icon" />}
              </div>
              <div className="dropdown-divider"></div>
              {columns.map((col) => (
                <div 
                  key={col.id}
                  className="dropdown-item"
                  onClick={() => handleGroupBy(col.id)}
                >
                  <span>{col.title}</span>
                  {currentGroupBy === col.id && <Check size={16} className="check-icon" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* More Options */}
        <div className="action-dropdown-wrapper" ref={moreRef}>
          <button 
            className="action-icon-btn"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
          >
            <MoreHorizontal size={18} />
          </button>
          
          {showMoreMenu && (
            <div className="dropdown-menu more-menu">
              <div className="dropdown-item">
                <Pin size={16} />
                <span>Pin column</span>
              </div>
              <div className="dropdown-item">
                <EyeOff size={16} />
                <span>Hide item</span>
              </div>
              <div className="dropdown-item">
                <Palette size={16} />
                <span>Conditional coloring</span>
              </div>
              <div className="dropdown-item">
                <Settings size={16} />
                <span>Default item values</span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ActionBar;
