import React, { useState } from 'react';

const OnePlatform = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Projects', color: '#6161ff' },
    { name: 'Sales', color: '#00a3c3' },
    { name: 'Marketing', color: '#ff5ac4' },
    { name: 'IT & Ops', color: '#fc527d' },
    { name: 'Product & Engineering', color: '#00ca72' },
    { name: 'Leadership', color: '#6161ff' },
  ];

  const content = [
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749108242/growth-marketing/web-experience/hp-jun-25/hp-bento-logo-wm-1.png',
      title: 'Drive execution at scale',
      desc: 'Deliver projects, programs, and portfolios with full resource visibility and AI-powered risk detection.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050978/Generator_featured%20images/hp-2025/departments/bento/drive-execution-at-scale-v4.png',
      stat: '$4M saved',
      statDesc: 'with optimized processes',
      quote: '"monday.com gives us the visibility to get everyone on the same page and track all the moving parts of our projects."',
      person: 'Jason Doan',
      role: 'VP of Operations, HOLT CAT',
      avatar: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/687362114a8e19b70c857667_Jason.png',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6859973449a1ded6476c7c6b_logo-height-holt.svg',
      bgColor: '#6161ff'
    },
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749108242/growth-marketing/web-experience/hp-jun-25/hp-bento-logo-crm.png',
      title: 'Accelerate revenue growth',
      desc: 'Free your teams from data entry to focus on sales and nurture, with AI actions and code-free automations.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050977/Generator_featured%20images/hp-2025/departments/bento/accelerate-revenue-growth-v4.png',
      stat: '18x ROI',
      statDesc: 'achieved in the first year',
      quote: '"As a VP, trying to look at a 30,000-ft view, I can see the percentage of successful opportunities."',
      person: 'Christopher Stone',
      role: 'VP Business Development, KC Petroleum',
      avatar: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6873627106c54dca6fa8aeaa_Christopher.png',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6860e2ec0f057ce07046a649_logo-height-kc.png',
      bgColor: '#00a3c3'
    },
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749108242/growth-marketing/web-experience/hp-jun-25/hp-bento-logo-wm-1.png',
      title: 'Amplify marketing impact',
      desc: 'Align marketing around shared goals with AI that streamlines briefs, flags delays, and drives campaign impact.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050983/Generator_featured%20images/hp-2025/departments/bento/unify-marketing-to-amplify-impact-v4.png',
      stat: '300% increase',
      statDesc: 'in creative output',
      quote: '"monday.com isn\'t just another tool in the mix, but a work operating system that supports our need for efficiency at scale."',
      person: 'Vic Diesta',
      role: 'Creative Operations Lead, Canva',
      avatar: 'https://cdn.prod.website-files.com/65b62e80a3a89609079c247a/670ba85ec4442a965eb743d8_Vic%20Diesta.jpeg',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68599734adc281438a689cd3_logo-height-canva.svg',
      bgColor: '#ff5ac4'
    },
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749108242/growth-marketing/web-experience/hp-jun-25/hp-bento-logo-svc.png',
      title: 'Scale exceptional service',
      desc: 'Empower teams to resolve requests faster with AI that triages, routes, and guides each issue to resolution.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050985/Generator_featured%20images/hp-2025/departments/bento/scale-exceptiona-service-v4.png',
      stat: '55 hours',
      statDesc: 'saved per month',
      quote: '"With monday service, 98% of our tickets are automatically categorized and assigned by AI."',
      person: 'Clive Camilleri',
      role: 'Head of People & Ops, Zopa Bank',
      avatar: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6860f221b5a054ab91f528af_image.png',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6860f49dd0c89f06fbf3217c_logo-height-zopa.png',
      bgColor: '#fc527d'
    },
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1749108242/growth-marketing/web-experience/hp-jun-25/hp-bento-logo-dev.png',
      title: 'Launch quality products faster',
      desc: 'Plan roadmaps, execute sprints, and ship with precision using AI-powered guidance.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050979/Generator_featured%20images/hp-2025/departments/bento/launch-quality-products-faster-v4.png',
      stat: '28% faster',
      statDesc: 'time to market',
      quote: '"monday dev ensures clear alignment between what we\'re building and market demand."',
      person: 'Alan Schmoll',
      role: 'Executive VP, Vistra Platform',
      avatar: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/686f8152e8fbbe7cb4f5c720_departments-headshot-6.png',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6859973471a781f640b90d09_logo-height-vistra.svg',
      bgColor: '#00ca72'
    },
    {
      logo: 'https://dapulse-res.cloudinary.com/image/upload/v1751447997/Generator_featured%20images/hp-2025/departments/logo-product-suit-v3.avif',
      title: 'Lead with clear foresight',
      desc: 'Keep strategic goals on track with AI risk flagging and cross-org data to make real-time decisions.',
      img: 'https://dapulse-res.cloudinary.com/image/upload/v1752050981/Generator_featured%20images/hp-2025/departments/bento/lead-with-clear-foresight-v4.webp',
      stat: '11% efficiency',
      statDesc: 'gained per month',
      quote: '"Now in real-time, we can identify health metrics and risks, whether they\'re coming from our side or the client side."',
      person: 'Paul Willie',
      role: 'COO, VML',
      avatar: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/6840979a2eb950be4600b697_VML-avatar.png',
      custLogo: 'https://cdn.prod.website-files.com/6836d5600e01e03c6cdf81d6/68599734447ec43a43f5474e_logo-height-vml.svg',
      bgColor: '#6161ff'
    }
  ];

  const c = content[activeTab];

  return (
    <div style={{ padding: '96px 32px', fontFamily: 'Poppins, sans-serif', background: '#fff' }}>
      <div style={{ maxWidth: '1376px', margin: '0 auto' }}>
        {/* Title */}
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: '#333', marginBottom: '48px', lineHeight: 1.3 }}>
          Solutions for every team. Powered by one platform.
        </h2>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {tabs.map((tab, i) => (
            <button key={tab.name} onClick={() => setActiveTab(i)} style={{
              padding: '12px 24px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              background: activeTab === i ? tab.color : '#f5f5f5',
              color: activeTab === i ? '#fff' : '#333',
              fontWeight: 400, fontSize: '14px', transition: 'all 0.3s'
            }}>{tab.name}</button>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {/* Main Bento Card - spans 2 cols & 2 rows */}
          <div style={{ gridColumn: 'span 2', gridRow: 'span 2', background: c.bgColor, borderRadius: '16px', padding: '32px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <img src={c.logo} alt="logo" style={{ height: '32px', marginBottom: '24px' }}/>
              <h3 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '16px', lineHeight: 1.2 }}>{c.title}</h3>
              <p style={{ fontSize: '16px', fontWeight: 300, opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>{c.desc}</p>
              <button style={{ background: '#fff', color: c.bgColor, border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Get Started <span>→</span>
              </button>
            </div>
            <img src={c.img} alt={c.title} style={{ width: '100%', marginTop: '24px', borderRadius: '8px' }}/>
          </div>

          {/* Stat Card */}
          <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img src={c.custLogo} alt="customer" style={{ height: '24px', marginBottom: '16px', objectFit: 'contain', alignSelf: 'flex-start' }}/>
            <p style={{ fontSize: '24px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>{c.stat}</p>
            <p style={{ fontSize: '14px', color: '#676879', fontWeight: 300 }}>{c.statDesc}</p>
          </div>

          {/* Quote Card */}
          <div style={{ gridRow: 'span 2', background: '#f5f5f5', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '14px', color: '#333', fontWeight: 300, lineHeight: 1.6, fontStyle: 'italic' }}>{c.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <img src={c.avatar} alt={c.person} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}/>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>{c.person}</p>
                <p style={{ fontSize: '12px', color: '#676879', fontWeight: 300 }}>{c.role}</p>
              </div>
            </div>
          </div>

          {/* Empty placeholder for grid alignment */}
          <div style={{ background: 'transparent' }}></div>
        </div>
      </div>
    </div>
  );
};

export default OnePlatform;