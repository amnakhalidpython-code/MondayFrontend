import React, { useState } from 'react';

const WorkChallenges = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState({
    wm: 'resource',
    crm: 'deal',
    dev: 'agile',
    service: 'triage'
  });

  const products = [
    {
      id: 'wm',
      name: 'Work Management',
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749146340/growth-marketing/web-experience/hp-jun-25/WM-2liner-black.png',
      description: 'Drive projects and processes forward with AI insights',
      signupUrl: 'https://auth.monday.com/p/core/users/sign_up_new',
      tabs: [
        {
          id: 'risk',
          title: 'AI-powered risk identification',
          description: 'Use AI to flag risks early to make informed decisions across your entire portfolio.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751872278/Generator_featured%20images/hp-2025/products/popup-assets/ai-powered-risk-identification-v2.avif'
        },
        {
          id: 'portfolio',
          title: 'Project and portfolio management',
          description: 'Gain visibility into risks and dependencies to ensure fast and precise project delivery.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751885711/Generator_featured%20images/hp-2025/products/popup-assets/Project_and_portfolio_management-v3-.avif'
        },
        {
          id: 'resource',
          title: 'Resource management',
          description: 'Use AI to assign the right people to every project based on skills, availability, and real-time capacity.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751538698/Generator_featured%20images/hp-2025/products/popup-assets/resource-managment-v4.avif'
        }
      ]
    },
    {
      id: 'crm',
      name: 'CRM',
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749646353/Generator_featured%20images/Webflow/CRM-logo-2-lines.avif',
      description: 'Automate full customer journeys with AI actions',
      signupUrl: 'https://auth.monday.com/p/crm/users/sign_up_new',
      bgColor: 'bg-cyan-50',
      tabs: [
        {
          id: 'deal',
          title: 'AI deal prioritization',
          description: 'Score deal health and close probability with monday CRM, so teams can focus on converting.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281664/Generator_featured%20images/hp-2025/products/popup-assets/AI_deal_prioritization.avif'
        },
        {
          id: 'communication',
          title: 'Connected communication',
          description: 'Centralize outreach, lead activity, and performance analytics, so nothing falls through the cracks.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281665/Generator_featured%20images/hp-2025/products/popup-assets/Connected_communication.avif'
        },
        {
          id: 'account',
          title: 'Post-sales & account management',
          description: 'Monitor account health, communicate and engage with clients to nurture key relationships.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281664/Generator_featured%20images/hp-2025/products/popup-assets/Post-sales_account_management.avif'
        }
      ]
    },
    {
      id: 'dev',
      name: 'Dev',
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749646353/Generator_featured%20images/Webflow/DEV-logo-2-lines.avif',
      description: 'Ship quality software with AI-guided sprints',
      signupUrl: 'https://auth.monday.com/p/software/users/sign_up_new',
      bgColor: 'bg-green-50',
      tabs: [
        {
          id: 'assistance',
          title: 'AI developer assistance',
          description: 'Resolve bugs and incidents faster with AI-surfaced context on related code, tasks, and documentation.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281665/Generator_featured%20images/hp-2025/products/popup-assets/AI_developer_assistant.avif'
        },
        {
          id: 'execution',
          title: 'Multi-method execution',
          description: 'Run sprints with Scrum, Kanban, or hybrid methods to move faster without admin blocks.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281665/Generator_featured%20images/hp-2025/products/popup-assets/Sprint_management.avif'
        },
        {
          id: 'agile',
          title: 'Agile insights',
          description: 'Get real-time metrics like cycle time and sprint velocity to ensure predictable delivery.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751281664/Generator_featured%20images/hp-2025/products/popup-assets/Agile_insights.avif'
        }
      ]
    },
    {
      id: 'service',
      name: 'Service',
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749646353/Generator_featured%20images/Webflow/SVC-logo-2-lines.avif',
      description: 'Deliver standout service with AI ticket handling',
      signupUrl: 'https://auth.monday.com/p/service/users/sign_up_new',
      bgColor: 'bg-pink-50',
      tabs: [
        {
          id: 'triage',
          title: 'AI ticket triage',
          description: 'Automatically categorize, prioritize, and route tickets with AI to speed up resolution times.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751872278/Generator_featured%20images/hp-2025/products/popup-assets/triage-v2.avif'
        },
        {
          id: 'resolution',
          title: 'AI ticket resolutions',
          description: 'Resolve repetitive requests instantly with AI-powered auto-replies based on past cases.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751885866/Generator_featured%20images/hp-2025/products/popup-assets/AI_ticket_resolutions-v2.avif'
        },
        {
          id: 'portal',
          title: 'Customer portal',
          description: 'Launch a dynamic portal for users to submit requests, track tickets, and access self-serve resources.',
          image: 'https://dapulse-res.cloudinary.com/image/upload/v1751528122/Generator_featured%20images/hp-2025/products/Customer_portal.avif'
        }
      ]
    }
  ];

  const departments = ['Sales', 'Engineering', 'IT', 'Marketing'];

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          <h2 className="text-4xl lg:text-5xl font-semibold max-w-xl">
            Solve work challenges<br />with AI-first products
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="text-gray-600 max-w-md text-right">
              Each product solves departmental needs, and together, they power seamless operations across your organization.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://auth.monday.com/users/sign_up_new?source=web_main&origin=hp_fullbg_page_header"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Get Started
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.03033 0.21967C6.73744 -0.0732233 6.26256 -0.0732233 5.96967 0.21967C5.67678 0.512563 5.67678 0.987437 5.96967 1.28033L8.93934 4.25H1C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H8.93934L5.96967 8.71967C5.67678 9.01256 5.67678 9.48744 5.96967 9.78033C6.26256 10.0732 6.73744 10.0732 7.03033 9.78033L11.6339 5.17678C11.7315 5.07915 11.7315 4.92085 11.6339 4.82322L7.03033 0.21967Z" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="/sales/contact-us"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Product Cards */}
          {products.map((product, idx) => (
            <button
              key={product.id}
              onClick={() => setActiveModal(product.id)}
              className={`${idx === 2 ? 'lg:col-start-1 lg:row-start-2' : idx === 3 ? 'lg:col-start-4 lg:row-start-2' : ''} bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col`}
            >
              <img src={product.logo} alt={product.name} className="h-12 mb-4 object-contain object-left" />
              <p className="text-gray-800 mb-6 flex-grow">{product.description}</p>
              <span className="text-blue-600 font-medium">Learn more →</span>
            </button>
          ))}

          {/* Center Image with Department Labels */}
          <div className="hidden lg:block lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2 relative">
            <img 
              src="https://dapulse-res.cloudinary.com/image/upload/v1751790795/Generator_featured%20images/hp-2025/products/products-main-img.png" 
              alt="Products Overview"
              className="w-full h-full object-contain"
            />
            {departments.map((dept, idx) => (
              <div 
                key={dept}
                className={`absolute bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md
                  ${idx === 0 ? 'top-1/4 left-0' : ''}
                  ${idx === 1 ? 'top-1/3 right-0' : ''}
                  ${idx === 2 ? 'bottom-1/3 left-0' : ''}
                  ${idx === 3 ? 'bottom-1/4 right-0' : ''}`}
              >
                {dept}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {products.find(p => p.id === activeModal) && (() => {
                const product = products.find(p => p.id === activeModal);
                return (
                  <div className="p-8">
                    <div className="mb-8">
                      <img src={product.logo} alt={product.name} className="h-12 mb-4" />
                      <h3 className="text-3xl font-semibold">{product.description}</h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Tabs */}
                      <div className="space-y-4">
                        {product.tabs.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab({...activeTab, [product.id]: tab.id})}
                            className={`w-full text-left p-4 rounded-xl transition-all ${
                              activeTab[product.id] === tab.id 
                                ? 'bg-blue-50 border-2 border-blue-500' 
                                : 'border-2 border-transparent hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <svg 
                                width="20" 
                                height="20" 
                                className={`transition-transform ${activeTab[product.id] === tab.id ? 'translate-x-0' : '-translate-x-2 opacity-0'}`}
                                viewBox="0 0 20 20" 
                                fill="none"
                              >
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <h4 className="font-semibold text-lg">{tab.title}</h4>
                            </div>
                            {activeTab[product.id] === tab.id && (
                              <p className="text-gray-600 mt-2 ml-8">{tab.description}</p>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Image */}
                      <div className="rounded-2xl overflow-hidden">
                        <img 
                          src={product.tabs.find(t => t.id === activeTab[product.id])?.image} 
                          alt={product.tabs.find(t => t.id === activeTab[product.id])?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href={product.signupUrl}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Get Started
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.03033 0.21967C6.73744 -0.0732233 6.26256 -0.0732233 5.96967 0.21967C5.67678 0.512563 5.67678 0.987437 5.96967 1.28033L8.93934 4.25H1C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H8.93934L5.96967 8.71967C5.67678 9.01256 5.67678 9.48744 5.96967 9.78033C6.26256 10.0732 6.73744 10.0732 7.03033 9.78033L11.6339 5.17678C11.7315 5.07915 11.7315 4.92085 11.6339 4.82322L7.03033 0.21967Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkChallenges;