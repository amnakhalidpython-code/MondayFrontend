import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, HelpCircle } from 'lucide-react';
import './RightPanel.css';

const RightPanel = () => {
  const navigate = useNavigate();

  return (
    <aside className="right-panel">
      
      {/* Templates Banner */}
      <div className="template-banner">
        <div className="template-banner-image">
          <img 
            src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/VladMystetskyi/4080f098-4741-44d6-934f-c4046171744d_Group3515.png" 
            alt="Templates" 
          />
        </div>
        <div className="template-banner-content">
          <h3 className="template-banner-title">
            Boost your workflow in minutes with ready-made templates
          </h3>
          <button 
            onClick={() => navigate('/templates')}
            className="template-explore-btn"
          >
            Explore templates
          </button>
        </div>
      </div>

      {/* Learn & Get Inspired */}
      <div className="learn-section">
        <h2 className="learn-section-title">Learn & get inspired</h2>
        
        {/* Getting Started Card */}
        <div 
          className="learn-card"
          onClick={() => window.open('https://support.monday.com/hc/en-us/articles/115005310545-Getting-Started-with-monday-com', '_blank')}
        >
          <div className="learn-card-icon getting-started-icon">
            <Rocket size={24} color="#ffffff" />
          </div>
          <div className="learn-card-content">
            <h3 className="learn-card-title">Getting started</h3>
            <p className="learn-card-description">Learn how monday.com works</p>
          </div>
        </div>

        {/* Help Center Card */}
        <div 
          className="learn-card"
          onClick={() => window.open('https://support.monday.com/hc/en-us', '_blank')}
        >
          <div className="learn-card-icon help-center-icon">
            <HelpCircle size={24} color="#ffffff" />
          </div>
          <div className="learn-card-content">
            <h3 className="learn-card-title">Help center</h3>
            <p className="learn-card-description">Learn and get support</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default RightPanel;