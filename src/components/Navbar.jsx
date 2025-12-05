import React, { useState } from 'react';

export default function MondayNavbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ProductIcon = ({ type }) => {
    const icons = {
      wm: "https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Homepage%20-%202024/WM.png",
      crm: "https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Homepage%20-%202024/CRM.png",
      dev: "https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Homepage%20-%202024/DEV.png",
      service: "https://dapulse-res.cloudinary.com/image/upload/Generator_featured%20images/Homepage%20-%202024/Services.png"
    };
    return <img src={icons[type]} alt="" className="w-12 h-12 rounded-lg" />;
  };

  const MenuLink = ({ title, menuKey }) => (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => menuKey && setOpenMenu(menuKey)}
      onMouseLeave={() => menuKey && setOpenMenu(null)}
    >
      <a
        href="#"
        className="flex items-center h-full px-4 hover:text-black transition-colors text-sm"
        style={{ color: '#323338', fontWeight: 300 }}
      >
        {title}
        {menuKey && (
          <svg className="w-2.5 h-2.5 ml-1.5 opacity-70" viewBox="0 0 256 256">
            <path fill="currentColor" d="M0 66.73c0 2.66.981 5.33 2.955 7.41l117.332 123.323a10.64 10.64 0 0 0 7.712 3.314c2.912 0 5.696-1.19 7.712-3.314L253.043 74.14c4.074-4.278 3.914-11.077-.331-15.163a10.627 10.627 0 0 0-15.083.333L128 174.536 18.379 59.32c-4.075-4.279-10.827-4.429-15.083-.343A10.76 10.76 0 0 0 0 66.73"/>
          </svg>
        )}
      </a>

      {menuKey && openMenu === menuKey && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
             style={{ width: menuKey === 'products' ? '780px' : '560px', border: '1px solid #E6E9EF', boxShadow: '0 10px 50px rgba(0,0,0,0.1)' }}>
          {menuKey === 'products' && (
            <div className="p-8">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>The Platform</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href="#" className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div className="border-2 border-dashed rounded-xl w-12 h-12 flex-shrink-0" style={{ backgroundColor: '#F6F7FB', borderColor: '#D0D4E4' }} />
                    <div>
                      <div className="font-semibold text-base mb-1" style={{ color: '#323338' }}>Dashboards & reporting</div>
                      <div className="text-sm" style={{ color: '#676879' }}>Visualize your data</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div className="border-2 border-dashed rounded-xl w-12 h-12 flex-shrink-0" style={{ backgroundColor: '#F6F7FB', borderColor: '#D0D4E4' }} />
                    <div>
                      <div className="font-semibold text-base mb-1" style={{ color: '#323338' }}>Integrations</div>
                      <div className="text-sm" style={{ color: '#676879' }}>Connect your tools</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-8" style={{ borderTop: '1px solid #E6E9EF' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>Products</p>
                <div className="grid grid-cols-2 gap-3">
                  {['wm', 'crm', 'dev', 'service'].map((type) => (
                    <a key={type} href="#" className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <ProductIcon type={type} />
                      <div>
                        <div className="font-semibold text-base mb-1" style={{ color: '#323338' }}>
                          monday {type === 'wm' ? 'work management' : type}
                        </div>
                        <div className="text-sm" style={{ color: '#676879' }}>
                          {type === 'wm' && 'For projects & tasks'}
                          {type === 'crm' && 'For customer-facing teams'}
                          {type === 'dev' && 'For product & dev teams'}
                          {type === 'service' && 'For IT & support'}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {menuKey === 'solutions' && (
            <div className="p-8 grid grid-cols-2 gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>By Team</p>
                {['Marketing', 'PMO', 'Sales', 'Operations'].map(item => (
                  <a key={item} href="#" className="block py-3 px-4 rounded-lg transition-all duration-200 text-base" style={{ color: '#323338', backgroundColor: 'transparent', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>{item}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>By Industry</p>
                {['Retail', 'Media', 'Construction'].map(item => (
                  <a key={item} href="#" className="block py-3 px-4 rounded-lg transition-all duration-200 text-base" style={{ color: '#323338', backgroundColor: 'transparent', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>{item}</a>
                ))}
              </div>
            </div>
          )}

          {menuKey === 'resources' && (
            <div className="p-8 grid grid-cols-2 gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>Learn</p>
                {['About us', 'Blog', 'Customer stories'].map(item => (
                  <a key={item} href="#" className="block py-3 px-4 rounded-lg transition-all duration-200 text-base" style={{ color: '#323338', backgroundColor: 'transparent', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>{item}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#676879' }}>Support</p>
                {['Help center', '24/7 support', 'Partners'].map(item => (
                  <a key={item} href="#" className="block py-3 px-4 rounded-lg transition-all duration-200 text-base" style={{ color: '#323338', backgroundColor: 'transparent', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F6F7FB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>{item}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50" style={{ height: '80px' }}>
        <div className="mx-auto px-8 h-full flex items-center justify-between" style={{ maxWidth: '1440px' }}>
          <a href="/" className="flex-shrink-0">
            <img src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png" alt="monday.com" className="h-11" />
          </a>

          <div className="hidden lg:flex items-center h-full flex-1 justify-between ml-6">
            <div className="flex items-center h-full">
              <MenuLink title="Products" menuKey="products" />
              <MenuLink title="Solutions" menuKey="solutions" />
              <MenuLink title="Resources" menuKey="resources" />
              <a href="/enterprise" className="flex items-center h-full px-4 hover:text-black transition-colors text-sm" style={{ color: '#323338', fontWeight: 300 }}>
                Enterprise
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a href="/pricing" className="text-sm hover:text-black transition-colors" style={{ color: '#323338', fontWeight: 300 }}>Pricing</a>
              <a href="/login" className="text-sm hover:text-black transition-colors" style={{ color: '#323338', fontWeight: 300 }}>Log in</a>
              <a href="/demo" className="px-4 py-2.5 border rounded-full text-[13px] transition-all duration-200" style={{ borderColor: '#6161FF', color: '#6161FF', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0F3FF'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                Request a demo
              </a>
              <button className="px-5 py-3 text-white rounded-full text-[13px] flex items-center gap-2 transition-all duration-200" style={{ backgroundColor: '#6161FF', fontWeight: 300 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5252E6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6161FF'}>
                Get Started
                <svg className="w-3.5 h-3.5" viewBox="0 0 9 7" fill="currentColor">
                  <path fillRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768z" clipRule="evenodd"/>
                </svg>
              </button>
              <button className=" hover:bg-gray-50 rounded-lg transition-colors">
                <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/uploads/Yotam_Ron/switcher-icon-hp.png" alt="Apps" className="w-10 h-10" />
              </button>
            </div>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl" style={{ borderTop: '1px solid #E6E9EF' }}>
            <div className="px-6 py-8 space-y-6">
              {['Products', 'Solutions', 'Resources', 'Enterprise', 'Pricing', 'Log in'].map(item => (
                <a key={item} href="#" className="block text-lg font-medium py-3" style={{ color: '#323338' }}>{item}</a>
              ))}
              <div className="pt-6 space-y-4" style={{ borderTop: '1px solid #E6E9EF' }}>
                <a href="/demo" className="block w-full text-center py-4 border-2 rounded-lg font-medium transition" style={{ borderColor: '#6161FF', color: '#6161FF' }}>
                  Request a demo
                </a>
                <button className="w-full py-4 text-white rounded-lg font-medium flex items-center justify-center gap-3 transition" style={{ backgroundColor: '#6161FF' }}>
                  Get Started
                  <svg className="w-4 h-4" viewBox="0 0 9 7" fill="currentColor">
                    <path fillRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div style={{ height: '72px' }} />
    </>
  );
}