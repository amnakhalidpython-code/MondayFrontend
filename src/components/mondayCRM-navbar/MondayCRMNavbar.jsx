import React from 'react';
import { Bell, Inbox, UserPlus, Puzzle, Bot, Settings, Search, HelpCircle, Grid } from 'lucide-react';

const MondayCRMNavbar = () => {
  return (
    <header 
      className="w-full flex items-center justify-between"
      style={{
        height: '50px',
        paddingLeft: '4px',
        paddingRight: '24px',
        fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif'
      }}
    >
      {/* Left Container */}
      <div className="flex items-center h-full">
        {/* Logo Link */}
        <a 
          href="/" 
          className="flex items-center no-underline"
          style={{
            height: '40px',
            paddingLeft: '6px',
            paddingRight: '10px',
            gap: '6px'
          }}
        >
          {/* Icon Container */}
          <div style={{ width: '25px', height: '25px' }}>
            <svg viewBox="0 0 31 21" fill="currentColor" width="25" height="25">
              <path d="M20.4755 9.93523C20.5038 10.337 20.175 10.6639 19.7728 10.6639L10.9856 10.6641C10.5834 10.6641 10.2546 10.991 10.283 11.3928C10.4325 13.5157 11.2329 15.5466 12.5826 17.201C14.0861 19.0437 16.1783 20.3051 18.5028 20.7702C20.8273 21.2353 23.2401 20.8753 25.3303 19.7515C27.4205 18.6277 29.0586 16.8098 29.9655 14.6073C30.8725 12.4049 30.9922 9.95424 30.3042 7.67298C29.6162 5.39172 28.1632 3.42099 26.1926 2.09656C24.222 0.772127 21.8558 0.175955 19.4972 0.409619C18.7926 0.479421 18.1018 0.621986 17.4346 0.83255C16.7504 1.04666 16.0911 1.33222 15.4672 1.6841C15.4299 1.70513 15.3928 1.7264 15.3558 1.74791C16.9259 2.65976 18.2361 3.9799 19.141 5.58233L19.1438 5.53853C19.1507 5.55065 19.1576 5.56279 19.1645 5.57495C19.9245 6.92088 20.368 8.41188 20.4755 9.93523Z" fill="#00A0A0"/>
              <ellipse cx="10.258" cy="10.664" rx="10.244" ry="10.304" fill="#fff"/>
              <ellipse cx="10.258" cy="10.664" rx="10.244" ry="10.304" fill="url(#paint0_linear_1581_89974)"/>
              <path d="M15.3813 19.5888C18.4424 17.8069 20.5017 14.4774 20.5017 10.6641C20.5104 10.248 20.4755 9.93518 20.4755 9.93518C20.495 10.334 20.175 10.6639 19.7728 10.6639L10.9856 10.664C10.5834 10.664 10.2546 10.991 10.283 11.3928C10.4325 13.5156 11.2329 15.5466 12.5826 17.2009C13.3708 18.167 14.3208 18.9733 15.3813 19.5888Z" fill="url(#paint1_linear_1581_89974)"/>
              <defs>
                <linearGradient id="paint0_linear_1581_89974" x1="3.133" y1="4.479" x2="20.544" y2="13.325">
                  <stop stopColor="#00D2D2"/>
                  <stop offset="1" stopColor="#00D2D2" stopOpacity=".29"/>
                </linearGradient>
                <linearGradient id="paint1_linear_1581_89974" x1="21.613" y1="15.982" x2="5.314" y2="12.605">
                  <stop stopColor="#00A0A0"/>
                  <stop offset="1" stopColor="#00D2D2"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Product Text */}
          <div style={{
            fontFamily: 'Poppins, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 300,
            color: '#323338'
          }}>
            <span style={{ fontWeight: 700, marginRight: '4px' }}>monday</span>
            <span style={{ fontWeight: 300 }}>CRM</span>
          </div>
        </a>

        {/* Pricing Container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              height: '32px',
              padding: '4px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1px solid #007f9b',
              borderRadius: '4px',
              color: '#007f9b',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background-color 0.1s',
              fontFamily: 'Figtree, Roboto, "Noto Sans Hebrew", "Noto Kufi Arabic", "Noto Sans JP", sans-serif',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 127, 155, 0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ marginRight: '8px' }}>
              <path d="M5.7205 3.22905C5.8506 3.08332 6.03668 3 6.23203 3H14.2113C14.4224 3 14.6217 3.09723 14.7516 3.26359L17.8547 7.23601C18.053 7.48988 18.0478 7.84757 17.8423 8.09563L10.528 16.9232C10.3977 17.0804 10.2042 17.1714 10 17.1714C9.79582 17.1714 9.60226 17.0804 9.47198 16.9232L2.1577 8.09563C1.94134 7.8345 1.94835 7.45444 2.17418 7.20147L5.7205 3.22905ZM5.95682 5.02365L6.60922 6.97241H4.21709L5.95682 5.02365ZM4.14439 8.34384H7.03991L8.48766 13.5857L4.14439 8.34384ZM11.5123 13.5857L15.8556 8.34384H12.9601L11.5123 13.5857ZM11.5373 8.34384L10 13.91L8.46268 8.34384H11.5373ZM13.4951 6.97241H15.9085L14.3727 5.00631L13.4951 6.97241ZM13.1542 4.37143H7.18472L8.05546 6.97241H11.9932L13.1542 4.37143Z" fillRule="evenodd" clipRule="evenodd"/>
            </svg>
            See plans
          </button>
        </div>
      </div>

      {/* Middle Container - Empty flex grow */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Right Container - Navigation */}
      <nav className="flex items-center" style={{ gap: '0px' }}>
        {/* Notifications Button */}
        <span style={{ position: 'relative' }}>
          <button
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderRadius: '4px',
              color: '#676879',
              cursor: 'pointer',
              outline: 'none',
              marginLeft: '2px',
              padding: 0,
              transition: 'background-color 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Bell size={20} />
          </button>
        </span>

        {/* Inbox Button with Badge */}
        <div style={{ position: 'relative', marginLeft: '2px' }}>
          <button
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderRadius: '4px',
              color: '#676879',
              cursor: 'pointer',
              outline: 'none',
              padding: 0,
              transition: 'background-color 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Inbox size={20} />
          </button>
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '16px',
            height: '16px',
            backgroundColor: '#c3c6d4',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 600,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1
          }}>
            1
          </span>
        </div>

        {/* Invite Members */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <UserPlus size={20} />
        </button>

        {/* Apps */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Puzzle size={20} />
        </button>

        {/* Autopilot */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bot size={20} />
        </button>

        {/* Settings */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Settings size={20} />
        </button>

        {/* Search */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Search size={20} />
        </button>

        {/* Help with Orange Badge */}
        <div style={{ position: 'relative', marginLeft: '2px' }}>
          <button
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              borderRadius: '4px',
              color: '#676879',
              cursor: 'pointer',
              outline: 'none',
              padding: 0,
              transition: 'background-color 0.1s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <HelpCircle size={20} />
          </button>
          <div style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            backgroundColor: '#fdab3d',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '24px',
          backgroundColor: '#d0d4e4',
          marginLeft: '4px',
          marginRight: '4px'
        }}></div>

        {/* Vibe Button */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.70508 3.43391C5.56977 2.24612 8.04433 2.795 9.23242 4.6595L10 5.8636L10.085 5.73177L10.7686 4.6595C11.9565 2.79503 14.4312 2.24644 16.2959 3.43391C18.1604 4.62198 18.7093 7.09655 17.5215 8.96126L13.3887 15.4486C12.2005 17.3127 9.7259 17.8608 7.86133 16.6732C7.34735 16.3456 6.93393 15.9201 6.62891 15.4368L6.57324 15.348L6.55566 15.3597L2.48047 8.96126C1.29283 7.0966 1.84074 4.62198 3.70508 3.43391ZM15.5977 4.52962C14.3386 3.72808 12.6674 4.09893 11.8652 5.35774L7.73242 11.845C6.93081 13.1041 7.30099 14.7752 8.55957 15.5775C9.81866 16.3794 11.4906 16.0091 12.293 14.7503L16.4258 8.26302C17.2278 7.00385 16.8566 5.33192 15.5977 4.52962ZM8.13672 5.35774C7.33441 4.09882 5.66249 3.72758 4.40332 4.52962C3.14439 5.33189 2.7743 7.00388 3.57617 8.26302L6.13379 12.2786L6.19922 12.0755C6.30198 11.7555 6.44752 11.4429 6.63672 11.1458L9.22949 7.07356L8.13672 5.35774Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Grid */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            color: '#676879',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Grid size={20} />
        </button>

        {/* Avatar */}
        <button
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: '4px',
            cursor: 'pointer',
            outline: 'none',
            marginLeft: '2px',
            padding: 0,
            transition: 'background-color 0.1s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(103, 104, 121, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ position: 'relative', width: '32px', height: '32px' }}>
            <img 
              src="https://cdn1.monday.com/dapulse_default_photo.png"
              alt="User"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1px'
            }}>
              <img
                src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                alt="Company"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>
        </button>
      </nav>
    </header>
  );
};

export default MondayCRMNavbar;