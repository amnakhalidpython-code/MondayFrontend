import React from 'react';
import { X, Search } from 'lucide-react';

const IntegrationsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const integrations = [
        { name: 'Gmail', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/gmail.png' },
        { name: 'Outlook', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/outlook.png' },
        { name: 'Slack', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/slack.png' },
        { name: 'Zoom', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/zoom.png' },
        { name: 'Excel', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/excel.png' },
        { name: 'Drive', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/google_drive.png' },
        { name: 'Dropbox', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/dropbox.png' },
        { name: 'Jira', icon: 'https://dapulse-res.cloudinary.com/image/upload/monday_platform/template-store/integrations/jira.png' },
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: 'Figtree, Roboto, sans-serif' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '800px', height: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #e6e9ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '400', color: '#323338', margin: 0 }}>Integration Center</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#676879' }}><X size={24} /></button>
                </div>

                {/* Search */}
                <div style={{ padding: '16px', backgroundColor: '#f7f9fb', borderBottom: '1px solid #e6e9ef' }}>
                    <div style={{ position: 'relative', maxWidth: '400px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#676879' }} />
                        <input type="text" placeholder="Search for an integration..." style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '4px', border: '1px solid #c3c6d4', outline: 'none' }} />
                    </div>
                </div>

                {/* Grid */}
                <div style={{ padding: '32px', overflowY: 'auto', flex: 1 }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px', fontWeight: '500' }}>Featured Integrations</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {integrations.map((app, idx) => (
                            <div key={idx} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                padding: '24px', border: '1px solid #e6e9ef', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#0073ea'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e6e9ef'; }}
                            >
                                <img src={app.icon} alt={app.name} style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '12px' }} />
                                <span style={{ color: '#323338', fontWeight: '500' }}>{app.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationsModal;