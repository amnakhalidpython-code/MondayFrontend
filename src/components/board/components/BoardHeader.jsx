// BoardHeader.jsx - Tailwind Version
import React from 'react';
import {
  Sparkles,
  Shuffle,
  Clock,
  MessageSquare,
  Link2,
  MoreHorizontal
} from 'lucide-react';

const BoardHeader = ({ boardTitle = 'work' }) => {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200 flex-shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-transparent border-none rounded cursor-pointer transition-colors hover:bg-gray-100">
          <h2 className="text-2xl font-normal text-gray-800 m-0 leading-tight">{boardTitle}</h2>
        </button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2 h-8 select-none">
        {/* Sidekick Button */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 bg-transparent border border-gray-300 rounded text-sm font-normal text-gray-800 cursor-pointer transition-all whitespace-nowrap hover:bg-gray-100 hover:border-gray-400">
            <Sparkles size={20} className="text-purple-600 flex-shrink-0" />
            <span>Sidekick</span>
            <span className="inline-flex items-center justify-center px-1.5 min-w-5 h-4.5 bg-gray-100 rounded text-xs font-semibold text-gray-800">0</span>
          </button>
        </div>

        {/* Integrate + Automate Group */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 bg-transparent border border-gray-300 rounded text-sm font-normal text-gray-800 cursor-pointer transition-all whitespace-nowrap hover:bg-gray-100 hover:border-gray-400">
            <Shuffle size={18} />
            <span>Integrate</span>
            <div className="flex items-center gap-0.5 ml-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
            </div>
          </button>

          <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 bg-transparent border border-gray-300 rounded text-sm font-normal text-gray-800 cursor-pointer transition-all whitespace-nowrap hover:bg-gray-100 hover:border-gray-400">
            <Clock size={20} />
            <span>Automate</span>
          </button>
        </div>

        {/* Icon Buttons Group */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center w-8 h-8 p-0 bg-transparent border border-gray-300 rounded text-gray-800 cursor-pointer transition-all flex-shrink-0 hover:bg-gray-100 hover:border-gray-400" aria-label="Start a board discussion">
            <MessageSquare size={20} />
          </button>
        </div>

        {/* Avatar Group */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center w-8 h-8 p-0 bg-transparent border-none rounded text-gray-800 cursor-pointer transition-opacity flex-shrink-0" aria-label="Board activity">
            <div className="flex items-center justify-center w-8 h-8 bg-pink-600 text-white rounded-full text-sm font-semibold cursor-pointer transition-opacity flex-shrink-0 hover:opacity-85">
              A
            </div>
          </button>
        </div>

        {/* Invite + Link Group */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center px-4 py-1.5 h-8 bg-transparent border border-gray-300 rounded text-sm font-normal text-gray-800 cursor-pointer transition-all whitespace-nowrap hover:bg-gray-100 hover:border-gray-400">
            Invite / 1
          </button>

          <button className="inline-flex items-center justify-center w-8 h-8 p-0 bg-transparent border border-gray-300 rounded text-gray-800 cursor-pointer transition-all flex-shrink-0 hover:bg-gray-100 hover:border-gray-400" aria-label="Copy Link">
            <Link2 size={20} />
          </button>
        </div>

        {/* Menu Button */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center w-8 h-8 p-0 bg-transparent border border-gray-300 rounded text-gray-800 cursor-pointer transition-all flex-shrink-0 hover:bg-gray-100 hover:border-gray-400" aria-label="Options">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BoardHeader;