import React, { useState } from "react";

const MondayHomepage = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    { name: 'Projects', color: '#6161FF' },
    { name: 'Tasks', color: '#0073EA' },
    { name: 'Marketing', color: '#ff5ac4' },
    { name: 'Design', color: '#faa1f1' },
    { name: 'CRM', color: '#00D2D2' },
    { name: 'Software', color: '#00CA72' },
    { name: 'IT', color: '#FB275D' },
    { name: 'Operations', color: '#E21277' },
    { name: 'Product', color: '#FF9900' },
  ];

  const toggleTag = (idx) => setSelectedTags(p => p.includes(idx) ? p.filter(t => t !== idx) : [...p, idx]);

  const Arrow = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 9 7" className="ml-2"><path fill="currentColor" fillRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768z"/></svg>;
  const Drop = () => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 256 256" className="ml-1 opacity-60"><path fill="currentColor" d="M0 66.73c0 2.66.981 5.33 2.955 7.41l117.332 123.323a10.64 10.64 0 0 0 7.712 3.314c2.912 0 5.696-1.19 7.712-3.314L253.043 74.14c4.074-4.278 3.914-11.077-.331-15.163a10.627 10.627 0 0 0-15.083.333L128 174.536 18.379 59.32c-4.075-4.279-10.827-4.429-15.083-.343A10.76 10.76 0 0 0 0 66.73"/></svg>;

  const icons = {
    Projects: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M1.88 1.88H13.13s1.25 0 1.25 1.25v8.75s0 1.25-1.25 1.25H1.88s-1.25 0-1.25-1.25v-8.75s0-1.25 1.25-1.25Z" stroke="#676879" strokeWidth="1.2"/><path d="M.63 5.62h13.75M16.88 5.62v8.75a1.25 1.25 0 0 1-1.25 1.25H4.38M19.38 8.12v8.75a1.25 1.25 0 0 1-1.25 1.25H6.88" stroke="#676879" strokeWidth="1.2"/></svg>,
    Tasks: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M3.88 2.93h12.4s.95 0 .95.95v12.4s0 .95-.95.95H3.88s-.95 0-.95-.95V3.88s0-.95.95-.95Z" stroke="#676879" strokeWidth="1.2"/><path d="M8.24 6.1L6.41 8.55 5.19 7.32M11.51 7.69h2.86M8.24 11.6l-1.83 2.44-1.22-1.22M11.51 13.41h2.86" stroke="#676879" strokeWidth="1.2"/></svg>,
    Marketing: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M5.87 11.74H4.18a2.82 2.82 0 0 1 0-5.64h1.69v5.64Z" stroke="#676879" strokeWidth="1.2"/><path d="M5.87 11.74c3.31 0 6.55.98 9.3 2.82l.85.57V2.71l-.85.57a15.5 15.5 0 0 1-9.3 2.82v5.64ZM18.28 7.79v2.26M5.87 11.74a6.4 6.4 0 0 0 1.69 3.95" stroke="#676879" strokeWidth="1.2"/></svg>,
    Design: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M10.95 16.89H3.93a.93.93 0 0 1-.93-.93V3.93c0-.51.42-.93.93-.93h12.04c.51 0 .93.42.93.93v7.02c0 .25-.1.49-.27.66l-5.02 5.02a.93.93 0 0 1-.66.27Z" stroke="#676879" strokeWidth="1.2"/><path d="M11.34 16.81v-4.55c0-.51.42-.93.93-.93h4.55M6.7 6.7h7.41M6.7 9.49h3.24" stroke="#676879" strokeWidth="1.2"/></svg>,
    CRM: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M11.83 12.67v2.5l3-2.5h2a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5" stroke="#676879" strokeWidth="1.2"/><circle cx="5" cy="10.17" r="3.5" stroke="#676879" strokeWidth="1.2"/></svg>,
    Software: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M16.81 15.81a.91.91 0 0 1-.91.91H4.92a.91.91 0 0 1-.92-.91V3.92c0-.5.41-.92.92-.92h9.18c.24 0 .47.1.64.26l1.8 1.76a.91.91 0 0 1 .27.65v10.14Z" stroke="#676879" strokeWidth="1.2"/><path d="M11.81 8.04l2.29 2.29-2.29 2.29M9.06 8.04L6.77 10.33l2.29 2.29" stroke="#676879" strokeWidth="1.2"/></svg>,
    IT: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M16.64 11.94V5.14a1.05 1.05 0 0 0-1.05-1.05H5.14c-.58 0-1.05.47-1.05 1.05v6.8h12.55Z" stroke="#676879" strokeWidth="1.2"/><path d="M18.12 15.17a.96.96 0 0 1-.95 1.47H3.57a.96.96 0 0 1-.96-1.47l1.48-3.24h12.55l1.48 3.24ZM9.32 14.55h2.09" stroke="#676879" strokeWidth="1.2"/></svg>,
    Operations: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><circle cx="10.31" cy="9.82" r="3.11" stroke="#676879" strokeWidth="1.2"/><path d="M17.69 10.04v1.17l-1.34.27a5.95 5.95 0 0 1-.76 1.83l.76 1.13-1.65 1.65-1.13-.76a5.95 5.95 0 0 1-1.83.76l-.27 1.33H9.15l-.27-1.33a5.95 5.95 0 0 1-1.83-.76l-1.13.76-1.65-1.65.76-1.13a5.95 5.95 0 0 1-.76-1.83l-1.33-.27v-2.33l1.33-.27c.15-.65.41-1.26.76-1.83l-.76-1.13 1.65-1.65 1.13.76c.57-.35 1.18-.61 1.83-.76l.27-1.33h2.33l.27 1.33c.65.15 1.26.41 1.83.76l1.13-.76 1.65 1.65-.76 1.13c.35.57.61 1.18.76 1.83l1.34.27v1.16" stroke="#676879" strokeWidth="1.2"/></svg>,
    Product: <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M10 15.31h7.43M15.31 13.18l2.12 2.13-2.12 2.12" stroke="#676879" strokeWidth="1.2"/><circle cx="7.35" cy="4.16" r="1.59" stroke="#676879" strokeWidth="1.2"/><circle cx="11.59" cy="9.47" r="1.59" stroke="#676879" strokeWidth="1.2"/><circle cx="8.41" cy="15.31" r="1.59" stroke="#676879" strokeWidth="1.2"/><path d="M10 9.47H5.49a2.92 2.92 0 0 0 0 5.84h1.33M13.18 9.47h1.59a2.63 2.63 0 0 0 0-5.26H8.94M5.76 4.16H2.57" stroke="#676879" strokeWidth="1.2"/></svg>
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, color: '#333', background: '#fff' }}>
   

      {/* Hero Section with Light Purple BG */}
    <div 
  style={{ 
    paddingTop: '10px', 
    backgroundColor: '#f0f3ff', 
    minHeight: '150vh' ,
    borderRadius: '40px' ,
    margin: '10px 20px 0 20px'
  }}
>
        <div className="flex flex-col items-center" style={{ padding: '16px 32px 0' }}>
          
          {/* AI Work Platform Badge */}
          <div className="flex flex-col items-center" style={{ marginTop: '40px' }}>


  {/* Image */}
  <img 
    src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/AI_work_platform.png"
    alt="AI work platform"
    className="w-auto"
    style={{ maxWidth: "200px" }}   
  />
</div>


          {/* Main Title */}
          <h1 className="text-center" style={{ fontWeight: 200, lineHeight: '110%', fontSize: 'clamp(40px, 5vw, 72px)', color: '#333', maxWidth: '1000px', marginTop: '20px' }}>
            From managing work,<br/>to doing the work for you
          </h1>

          {/* Subtitle */}
          <p className="text-center" style={{ fontWeight: 300, lineHeight: '160%', fontSize: '18px', color: '#333', maxWidth: '620px', marginTop: '24px' }}>
            Agentic AI products that deliver results across projects, marketing, sales, operations, and engineering.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center" style={{ marginTop: '30px' }}>
            <button className="px-8 py-3 text-white rounded-full flex items-center text-lg" style={{ backgroundColor: '#6161ff', fontWeight: 300 }}>
              Get Started<Arrow/>
            </button>
            <p style={{ fontWeight: 400, marginTop: '16px', fontSize: '14px', color: '#676879' }}>
              No credit card needed&nbsp;&nbsp;✦&nbsp;&nbsp;Unlimited time on Free plan
            </p>
          </div>

          {/* Tags Card + Screenshot Section */}
          <div className="flex justify-center items-start w-full" style={{ marginTop: '60px', gap: '0', position: 'relative' }}>
            
            {/* Screenshot on LEFT */}
            <div className="relative" style={{ maxWidth: '950px', marginRight: '-80px', zIndex: 1 }}>
<img 
  src="https://dapulse-res.cloudinary.com/image/upload/v1742132119/Gantt.png"
  alt="Projects"
  className="rounded-xl"
  style={{ 
    width: '100%',
    filter: 'blur(6px)'   // 👈 Blur added
  }}
/>
            </div>

            {/* Tags Card on RIGHT */}
            <div className="rounded-2xl border flex-shrink-0" style={{ 
              background: '#fff',
              boxShadow: '4px 4px 35px 0 rgba(0,0,0,0.1)',
              borderColor: '#DCDFEC',
              padding: '24px',
              width: '320px',
              zIndex: 10,
              marginTop: '-40px'
            }}>
              <p style={{ fontSize: '16px', color: '#333', fontWeight: 400, marginBottom: '20px' }}>What would you like to manage?</p>
              
              <div className="grid grid-cols-3 gap-3">
                {tags.map((tag, idx) => (
                  <button key={tag.name} onClick={() => toggleTag(idx)} className="flex flex-col items-center p-3 rounded-lg border transition-all hover:shadow-sm" style={{ 
                    borderColor: selectedTags.includes(idx) ? tag.color : '#e0e0e0',
                    backgroundColor: selectedTags.includes(idx) ? `${tag.color}10` : '#fff'
                  }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded border flex items-center justify-center" style={{ borderColor: selectedTags.includes(idx) ? tag.color : '#d0d4e4' }}>
                        {selectedTags.includes(idx) && <svg width="8" height="6" viewBox="0 0 9 8" fill="none"><path d="M1 3.5L3.5 6.5L7.5 1" stroke={tag.color} strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      </div>
                      {icons[tag.name]}
                    </div>
                    <span style={{ fontSize: '12px', color: '#676879', fontWeight: 300 }}>{tag.name}</span>
                  </button>
                ))}
              </div>

              <button className=" mt-5 px-3 py-2.5 text-white rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: '#6161ff', fontWeight: 300,  }}>
                Get Started<Arrow/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MondayHomepage;