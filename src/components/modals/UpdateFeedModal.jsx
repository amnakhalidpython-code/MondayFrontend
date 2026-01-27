import React from 'react';
import { X, Check } from 'lucide-react';
import Lottie from 'lottie-react';
import handclap from '../../animation/Hand clap 2.json'; // Ensure this path is correct based on your folder structure

const UpdateFeedModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: 'Figtree, Roboto, sans-serif' }}>
            <div style={{ backgroundColor: '#f7f9fb', borderRadius: '16px', width: '700px', height: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{ padding: '16px 24px', backgroundColor: 'white', borderBottom: '1px solid #e6e9ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#323338', margin: 0 }}>Update Feed (Inbox)</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#676879', cursor: 'pointer', fontSize: '13px' }}>
                            <Check size={14} /> Mark all read
                        </button>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#676879' }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Empty State Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                    <div style={{ width: '250px', height: '250px' }}>
                        <Lottie animationData={handclap} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '500', color: '#323338', marginTop: '20px' }}>You're all caught up!</h3>
                    <p style={{ fontSize: '14px', color: '#676879', marginTop: '10px', textAlign: 'center', maxWidth: '300px' }}>
                        No new updates to show. Check back later to stay in sync with your team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdateFeedModal;