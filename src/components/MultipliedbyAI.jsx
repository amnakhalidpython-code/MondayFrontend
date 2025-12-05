import React, { useState, useEffect, useRef } from 'react';

const MultipliedByAI = () => {
  const [activeTab, setActiveTab] = useState(0);
  const videoRefs = useRef([]);

  const tabs = [
    {
      id: 0,
      icon: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68434427d01d8650b4b38dda_ai-impact-icon-1.svg',
      title: 'Predict risks early',
      videoMp4: 'https://dapulse-res.cloudinary.com/video/upload/v1751884472/_AI_tab_WM_-_Risk-v2.mp4',
      videoWebm: 'https://dapulse-res.cloudinary.com/video/upload/v1751884472/_AI_tab_WM_-_Risk-v2.webm'
    },
    {
      id: 1,
      icon: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68434b6e840ff5d6bcbfba4c_ai-impact-icon-2.svg',
      title: 'Scale marketing output',
      videoMp4: 'https://dapulse-res.cloudinary.com/video/upload/v1751486626/_AI_tab_WM_-_Scale_marketing_output.mp4',
      videoWebm: 'https://dapulse-res.cloudinary.com/video/upload/v1751486626/_AI_tab_WM_-_Scale_marketing_output.webm'
    },
    {
      id: 2,
      icon: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68434b6e314914781dd122a4_ai-impact-icon-3.svg',
      title: 'Boost sales velocity',
      videoMp4: 'https://dapulse-res.cloudinary.com/video/upload/v1751486625/_AI_tab_CRM.mp4',
      videoWebm: 'https://dapulse-res.cloudinary.com/video/upload/v1751486625/_AI_tab_CRM.webm'
    },
    {
      id: 3,
      icon: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68434b6ef93a6363a3b24abc_ai-impact-icon-4.svg',
      title: 'Resolve tickets faster',
      videoMp4: 'https://dapulse-res.cloudinary.com/video/upload/v1751486623/_AI_tab_SERVICE.mp4',
      videoWebm: 'https://dapulse-res.cloudinary.com/video/upload/v1751486623/_AI_tab_SERVICE.webm'
    },
    {
      id: 4,
      icon: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68434b6e053354f15983318b_ai-impact-icon-5.svg',
      title: 'Drive quality sprints',
      videoMp4: 'https://dapulse-res.cloudinary.com/video/upload/v1751486622/_AI_tab_DEV.mp4',
      videoWebm: 'https://dapulse-res.cloudinary.com/video/upload/v1751486622/_AI_tab_DEV.webm'
    }
  ];

  // Play video when tab changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeTab) {
          video.play().catch(err => console.log('Video play error:', err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeTab]);

  return (
    <section className="relative py-24 px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Decorative gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-purple-900/20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <img 
            src="https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6843441dbf070225912699df_ai-star.svg" 
            alt="AI Star" 
            className="w-16 h-16 mx-auto mb-6 animate-pulse"
          />
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6">
            Your teams' impact. Multiplied by AI.
          </h2>
          <a 
            href="https://monday.com/w/ai" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:underline group"
          >
            <span>Learn more about monday's AI offering</span>
            <svg 
              width="12" 
              height="10" 
              viewBox="0 0 12 10" 
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M7.03033 0.21967C6.73744 -0.0732233 6.26256 -0.0732233 5.96967 0.21967C5.67678 0.512563 5.67678 0.987437 5.96967 1.28033L8.93934 4.25H1C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H8.93934L5.96967 8.71967C5.67678 9.01256 5.67678 9.48744 5.96967 9.78033C6.26256 10.0732 6.73744 10.0732 7.03033 9.78033L11.6339 5.17678C11.7315 5.07915 11.7315 4.92085 11.6339 4.82322L7.03033 0.21967Z" 
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Tabs */}
          <div className="space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 text-left ${
                  activeTab === tab.id
                    ? 'bg-white/20 backdrop-blur-sm border-2 border-white/40 shadow-lg'
                    : 'bg-white/5 backdrop-blur-sm border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  activeTab === tab.id ? 'bg-white/30' : 'bg-white/10'
                }`}>
                  <img 
                    src={tab.icon} 
                    alt={tab.title}
                    className="w-7 h-7"
                  />
                </div>
                <h3 className={`text-lg font-semibold transition-colors ${
                  activeTab === tab.id ? 'text-white' : 'text-white/70'
                }`}>
                  {tab.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Right Side - Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm">
            <div className="aspect-video relative">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`absolute inset-0 transition-opacity duration-600 ${
                    activeTab === tab.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <video
                    ref={el => videoRefs.current[tab.id] = el}
                    className="w-full h-full object-cover"
                    width="100%"
                    height="100%"
                    playsInline
                    muted
                    loop
                    poster=""
                  >
                    <source src={tab.videoMp4} type="video/mp4" />
                    <source src={tab.videoWebm} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
            
            {/* Video overlay gradient for better aesthetics */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Mobile Tab Indicators (optional) */}
        <div className="flex lg:hidden justify-center gap-2 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeTab === tab.id 
                  ? 'w-8 bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to ${tab.title}`}
            />
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default MultipliedByAI;