import React from 'react';

const categories = [
  'Start from scratch',
  'AI-powered',
  'Marketing',
  'Content Production',
  'Project Management',
  'Sales & CRM',
  'HR',
  'Nonprofits',
  'Software Development',
  'Operations'
];

const TemplateSidebar = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="w-64 bg-white border-r overflow-y-auto">
      <div className="p-4">
        {/* Explore Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            Explore
          </h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
              All templates
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
              Recommended for you
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
              Created by me
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* General Templates */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            General templates
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSidebar;