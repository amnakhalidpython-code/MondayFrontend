import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateAccountEight = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [invites, setInvites] = useState([
    { id: 0, email: '', role: 'Admin' },
    { id: 1, email: '', role: 'Admin' }
  ]);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    accountName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [accountUrl, setAccountUrl] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setDataLoading(true);
        
        // Try multiple sources for email
        let email = user?.email || localStorage.getItem('userEmail');
        let name = user?.displayName || '';
        let userId = user?.uid || 'email-user';
        
        if (!email) {
          console.error('❌ No email found anywhere');
          alert('Session expired. Please start again.');
          navigate('/one');
          return;
        }

        console.log('✅ Found email:', email);
        console.log('👤 Fetching account data...');

        // Fetch accountName from MongoDB
        const response = await fetch('https://monday-clone-backend.vercel.app/api/account/get-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        console.log('📦 Account data response:', data);
        
        if (response.ok && data.account) {
          const accountData = {
            name: data.account.fullName || name || 'User',
            email: email,
            accountName: data.account.accountName || ''
          };
          
          console.log('✅ Setting userData:', accountData);
          setUserData(accountData);
          
          // Set account URL
          if (data.account.accountName) {
            setAccountUrl(`${data.account.accountName}.monday.com`);
            console.log('✅ Account URL:', `${data.account.accountName}.monday.com`);
          } else {
            console.warn('⚠️ Account name is missing!');
          }
        } else {
          console.warn('⚠️ Account not found in database');
          // Use available data
          setUserData({
            name: name || 'User',
            email: email,
            accountName: ''
          });
        }
      } catch (error) {
        console.error('❌ Error fetching account data:', error);
        // Fallback
        const email = localStorage.getItem('userEmail');
        if (email) {
          setUserData({
            name: user?.displayName || 'User',
            email: email,
            accountName: ''
          });
        }
      } finally {
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const addInvite = () => {
    setInvites([...invites, { id: Date.now(), email: '', role: 'Admin' }]);
  };

  const removeInvite = (id) => {
    setInvites(invites.filter(invite => invite.id !== id));
  };

  const updateEmail = (id, email) => {
    setInvites(invites.map(invite => 
      invite.id === id ? { ...invite, email } : invite
    ));
  };

  const hasValidEmails = invites.some(invite => invite.email.trim().length > 0);

  const handleInviteTeam = async () => {
    if (!hasValidEmails) {
      alert('Please add at least one email address');
      return;
    }
    
    // Check if accountName exists
    if (!userData.accountName || userData.accountName.trim() === '') {
      alert('❌ Account name is missing! Please go back and complete your account setup.');
      console.error('Missing accountName:', userData);
      return;
    }
    
    setLoading(true);
    
    try {
      // Filter only valid invitations
      const validInvitations = invites.filter(invite => invite.email.trim().length > 0);
      
      // Get user ID - either from Firebase or create a temporary one
      const userId = user?.uid || `email-user-${Date.now()}`;
      
      const payload = {
        inviterUserId: userId,
        inviterName: userData.name,
        inviterEmail: userData.email,
        accountName: userData.accountName,
        invitations: validInvitations
      };
      
      console.log('📤 Sending invitation data:', payload);
      
      const response = await fetch('https://monday-clone-backend.vercel.app/api/invitations/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      console.log('📥 Response from server:', data);
      
      if (response.ok) {
        alert(`✅ Successfully sent ${data.sentCount} invitation(s)!`);
        navigate('/nine');
      } else {
        console.error('❌ Server error:', data);
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('❌ Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemindLater = () => {
    navigate('/nine');
  };

  // Show loading state
  if (dataLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col p-12 relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={() => navigate('/seven')}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-10">
          <img 
            src="https://dapulse-res.cloudinary.com/image/upload/assets/work-management.png" 
            alt="logo" 
            className="h-6 mb-8"
          />
          <h2 className="text-3xl font-normal text-gray-800">
            Who else is on your team?
          </h2>
          
          {/* Display Account URL */}
          {accountUrl ? (
            <p className="text-sm text-gray-600 mt-4">
              Your team will join: <span className="font-semibold text-blue-600">{accountUrl}</span>
            </p>
          ) : (
            <p className="text-sm text-red-600 mt-4">
              ⚠️ Warning: Account name is missing. Please go back and complete setup.
            </p>
          )}
        </div>

        {/* Content - Invite Inputs */}
        <div className="flex-grow max-w-[630px]">
          <div className="space-y-3">
            {invites.map((invite, index) => (
              <div key={invite.id} className="flex items-center gap-2">
                {/* Email Input */}
                <div className="flex-1 flex items-center border border-gray-300 rounded-l h-12">
                  <input
                    type="email"
                    placeholder="Add email here"
                    value={invite.email}
                    onChange={(e) => updateEmail(invite.id, e.target.value)}
                    className="flex-1 h-full px-4 text-base outline-none text-gray-700 placeholder-gray-400"
                    autoComplete="off"
                  />
                </div>

                {/* Role Dropdown */}
                <div className="w-32 border border-gray-300 border-l-0 rounded-r h-12 flex items-center px-3 bg-white relative">
                  <select 
                    value={invite.role}
                    onChange={(e) => {
                      setInvites(invites.map(inv => 
                        inv.id === invite.id ? { ...inv, role: e.target.value } : inv
                      ));
                    }}
                    className="w-full text-sm outline-none bg-transparent cursor-pointer appearance-none pr-6 text-gray-700"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <svg 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    width="20px" 
                    height="20px" 
                    className="text-gray-500 absolute right-2 pointer-events-none"
                  >
                    <path d="M9.442 12.76a.77.77 0 0 0 1.116 0l4.21-4.363a.84.84 0 0 0 0-1.157.77.77 0 0 0-1.116 0L10 11.025 6.348 7.24a.77.77 0 0 0-1.117 0 .84.84 0 0 0 0 1.157l4.21 4.363Z"></path>
                  </svg>
                </div>

                {/* Remove Button - Only show for added items (not first 2) */}
                {index > 1 && (
                  <button
                    onClick={() => removeInvite(invite.id)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                )}
                
                {/* Empty space for alignment when no remove button */}
                {index <= 1 && <div className="w-6 h-6 flex-shrink-0"></div>}
              </div>
            ))}
          </div>

          {/* Add Another Button */}
          <button
            onClick={addInvite}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded mt-4 transition-colors"
          >
            <Plus size={20} />
            <span className="text-sm font-normal">Add another</span>
          </button>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-auto max-w-[630px] pt-8">
          <button 
            onClick={handleRemindLater}
            className="text-black hover:bg-gray-100 px-4 py-2 rounded transition-colors text-base"
            disabled={loading}
          >
            Remind me later
          </button>
          <button 
            onClick={handleInviteTeam}
            disabled={!hasValidEmails || loading || !userData.accountName}
            className={`px-8 py-3 rounded text-base font-normal transition-colors ${
              hasValidEmails && !loading && userData.accountName
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Sending...' : 'Invite your team'}
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div 
        className="w-[45%] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'rgb(0, 202, 114)' }}
      >
        <img 
          src="https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/new-signup-right-side-assets/Invite-your-teammates.png"
          alt="Invite your team"
          className="w-[70%] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default CreateAccountEight;