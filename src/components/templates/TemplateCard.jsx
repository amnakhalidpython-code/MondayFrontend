import React from 'react';
import { Download } from 'lucide-react';

const TemplateCard = ({ template, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-1 truncate">
          {template.name}
        </h3>

        {/* Creator */}
        <p className="text-sm text-gray-500 mb-2">by {template.creator}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Downloads */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Download className="w-4 h-4" />
            <span>{template.downloads}</span>
          </div>

          {/* Integrations */}
          <div className="flex -space-x-2">
            {template.integrations.slice(0, 3).map((integration, index) => (
              <img
                key={index}
                src={integration.icon}
                alt={integration.name}
                className="w-6 h-6 rounded-full border-2 border-white"
                title={integration.name}
              />
            ))}
            {template.integrations.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                +{template.integrations.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;