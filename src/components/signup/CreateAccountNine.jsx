import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MondayBoardWizard = () => {
  const [boardName, setBoardName] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBoardName(value);
    setIsNextEnabled(value.trim().length > 0);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(41,47,76,0.7)] flex items-center justify-center">
      <div className="bg-white w-full h-full overflow-hidden shadow-2xl flex relative">
        {/* Close Button */}
        <button 
          className="fixed top-2.5 right-2.5 z-10 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#323338]" />
        </button>

        {/* Left Panel - Form */}
        <div className="flex-1 min-w-[503px] flex flex-col justify-between bg-white">
          <div className="flex-1 overflow-y-auto px-20 pt-20 pb-12">
            {/* Logo */}
            <div className="flex justify-between items-center mb-11">
              <div className="h-[25px]">
                <img 
                  src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png" 
                  alt="logo" 
                  className="h-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-[600px] min-w-[375px]">
              {/* Heading */}
              <div className="mb-11">
                <h2 className="text-2xl font-medium text-[#323338] leading-[30px] tracking-[-0.1px]" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                  Let's start working together
                </h2>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="board-name" className="block text-sm text-[#323338] mb-2 leading-5" style={{ fontFamily: 'Figtree, Roboto, sans-serif' }}>
                    Give your board a name, e.g. marketing plan, sales pipeline, quarterly roadmap...
                  </label>
                  <div className="relative w-full max-w-[400px]">
                    <input
                      type="text"
                      id="board-name"
                      className="w-full h-10 px-4 py-2 border border-[#c3c6d4] rounded text-base text-[#323338] focus:outline-none focus:border-[#0073ea] transition-colors"
                      placeholder="My first project"
                      maxLength={40}
                      value={boardName}
                      onChange={handleInputChange}
                      autoComplete="off"
                      style={{ fontFamily: 'Figtree, Roboto, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-[#f6f7fb] px-4 py-4 rounded-lg text-sm max-w-[400px]">
                  <p className="text-[#323338]" style={{ fontFamily: 'Figtree, Roboto, sans-serif' }}>
                    In monday.com, "boards" are the place where all your content lives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 px-20 py-6 flex justify-between items-center bg-white border-t border-gray-100">
            <button className="px-6 py-2 border border-[#c3c6d4] rounded text-[#323338] hover:bg-gray-50 transition-colors flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button 
              className={`px-6 py-2 rounded flex items-center gap-2 transition-colors ${
                isNextEnabled 
                  ? 'bg-[#0073ea] text-white hover:bg-[#0060b9]' 
                  : 'bg-[#e7e9ef] text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isNextEnabled}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Panel - Board Preview */}
        <div className="flex-1 bg-[#eceff8] flex items-center justify-center p-16">
          <div className="bg-white rounded-2xl w-full max-w-[702px] h-[650px] ml-16 p-8 relative overflow-hidden" style={{ filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))' }}>
            {/* Board Name */}
            <div className="mb-2">
              {boardName ? (
                <h1 className="text-[32px] font-medium text-[#323338] leading-[40px] tracking-[-0.5px] truncate max-w-[600px]" style={{ fontFamily: 'Poppins, Roboto, sans-serif' }}>
                  {boardName}
                </h1>
              ) : (
                <div className="h-10 w-48 bg-[#c3c6d4] rounded animate-pulse"></div>
              )}
            </div>

            {/* Separator */}
            <div className="h-12"></div>

            {/* Board Table Grid */}
            <div className="grid grid-cols-[184px_363px_117px] gap-0 max-h-[472px] overflow-y-auto">
              {/* Left Column - Item Names */}
              <div className="mr-8">
                {/* Group 1 - Blue */}
                <div className="mb-4">
                  <div className="mb-2">
                    <div className="h-1.5 w-[120px] bg-[#579bfc] rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="h-8 flex items-center border-l-4 border-[#579bfc] pl-2">
                      <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                    </div>
                    {/* Rows */}
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-8 flex items-center border-l-4 border-[#579bfc] pl-2">
                        <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                      </div>
                    ))}
                    {/* Add row */}
                    <div className="h-8 flex items-center border-l-4 border-[#579bfc]/50 pl-2">
                      <div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Group 2 - Green */}
                <div>
                  <div className="mb-2">
                    <div className="h-1.5 w-[120px] bg-[#00c875] rounded"></div>
                  </div>
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="h-8 flex items-center border-l-4 border-[#00c875] pl-2">
                      <div className="h-1 w-20 bg-[#c3c6d4] rounded"></div>
                    </div>
                    {/* Add row */}
                    <div className="h-8 flex items-center border-l-4 border-[#00c875]/50 pl-2">
                      <div className="h-1 w-20 bg-[rgba(103,104,121,0.1)] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Main Content */}
              <div className="overflow-x-scroll">
                <div className="h-[240px]"></div>
              </div>

              {/* Right Column - Add Columns */}
              <div className="mt-9">
                <div className="flex-1 mb-14">
                  <div className="flex items-center justify-center mb-2">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-8"></div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Additional Columns Preview */}
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-[1fr_1fr_1fr] gap-2">
              {/* Column Headers */}
              <div className="flex flex-col gap-2">
                <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 flex items-center">
                    <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 flex items-center">
                    <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 flex items-center">
                    <div className="h-1 w-8 bg-[#c3c6d4] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MondayBoardWizard;