import React, { useState, useEffect } from 'react';
import TemplateSidebar from './TemplateSidebar';
import TemplateGrid from './TemplateGrid';
import TemplatePreviewModal from './TemplatePreviewModal';
import { Search, X } from 'lucide-react';

const TemplateCenterPage = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Nonprofits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all templates on mount
  useEffect(() => {
    fetchTemplatesByCategory('Nonprofits');
  }, []);

  // Fetch templates by category
  const fetchTemplatesByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/templates/category/${category}`);
      const data = await response.json();
      
      if (data.success) {
        setTemplates(data.templates);
        setFilteredTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    fetchTemplatesByCategory(category);
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredTemplates(templates);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/templates/search?q=${query}`);
      const data = await response.json();
      
      if (data.success) {
        setFilteredTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error searching templates:', error);
    }
  };

  // Handle template click
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  // Handle template use
  const handleUseTemplate = async (templateId, customName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/templates/${templateId}/use`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'), // Agar auth hai
          customBoardName: customName
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Board created successfully!');
        // Redirect to board
        window.location.href = `/boards/${data.boardId}`;
      }
    } catch (error) {
      console.error('Error creating board from template:', error);
      alert('Failed to create board');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <TemplateSidebar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="https://microfrontends.monday.com/mf-template-center/latest/static/media/wand_logo.9f832d3d.svg" 
              alt="Template Center" 
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold">
              <span className="font-bold">Template</span> center
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by template name, creator or description"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-white border-b px-8 py-4">
          <h2 className="text-xl font-semibold">
            <span className="font-bold">General templates |</span> {selectedCategory}
          </h2>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-xl text-gray-500">Loading templates...</div>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-xl text-gray-500">No templates found</div>
            </div>
          ) : (
            <TemplateGrid
              templates={filteredTemplates}
              onTemplateClick={handleTemplateClick}
            />
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => {
            setShowPreview(false);
            setSelectedTemplate(null);
          }}
          onUseTemplate={handleUseTemplate}
        />
      )}
    </div>
  );
};

export default TemplateCenterPage;