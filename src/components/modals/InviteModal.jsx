import React, { useState, useEffect } from 'react';
import { X, Mail, User, CheckCircle } from 'lucide-react';

const InviteModal = ({ isOpen, onClose, userInfo, onInviteSent }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [invitations, setInvitations] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');

    // Fetch list when modal opens
    useEffect(() => {
        if (isOpen && userInfo?.email) {
            fetchInvitations();
        }
    }, [isOpen, userInfo]);

    const fetchInvitations = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/invitations/sent?userId=${encodeURIComponent(userInfo.email)}`);
            const data = await response.json();
            if (data.success) {
                setInvitations(data.invitations);
            }
        } catch (error) {
            console.error("Error fetching invites", error);
        }
    };

    const handleSend = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/invitations/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inviterUserId: userInfo.email,
                    inviterName: userInfo.name,
                    inviterEmail: userInfo.email,
                    accountName: userInfo.company || 'My Workspace',
                    invitations: [{ email: email, role: 'Member' }]
                })
            });

            const data = await response.json();
            if (response.ok) {
                setEmail('');
                setSuccessMsg('Invite sent successfully!');
                setTimeout(() => setSuccessMsg(''), 3000);
                fetchInvitations(); // Refresh list
                if (onInviteSent) onInviteSent(); // Refresh count in navbar
            } else {
                alert(data.message || 'Failed to send invite');
            }
        } catch (error) {
            console.error(error);
            alert('Error sending invite');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', fontFamily: 'Figtree, Roboto, sans-serif'
        }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>

                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid #e6e9ef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#323338', margin: 0 }}>
                        Invite to {userInfo.company || 'Team'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#676879' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', overflowY: 'auto' }}>

                    {/* Input Section */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid #c3c6d4', fontSize: '14px', outline: 'none' }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            style={{
                                padding: '8px 24px',
                                backgroundColor: '#0073ea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Sending...' : 'Invite'}
                        </button>
                    </div>

                    {successMsg && (
                        <div style={{ marginBottom: '20px', color: '#00c875', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={16} /> {successMsg}
                        </div>
                    )}

                    {/* List Section */}
                    <div>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#676879', marginBottom: '12px', textTransform: 'uppercase' }}>
                            Invited Members ({invitations.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {invitations.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#9699a6', fontStyle: 'italic' }}>
                                    No invitations sent yet.
                                </div>
                            ) : (
                                invitations.map((inv) => (
                                    <div key={inv._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f6f8' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#a25ddc', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', color: '#323338' }}>{inv.invitedEmail}</div>
                                                <div style={{ fontSize: '12px', color: '#676879' }}>{inv.role} • {inv.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteModal;