import React, { useState } from 'react';
import {
  Sparkles, Shuffle, Clock, Link2, MoreHorizontal, MessageCircle,
  X, MessageSquareText, Github, Gitlab, Slack, Zap, Grid,
  Search, Crown, Mail, Send, Loader2
} from 'lucide-react';

const BoardHeader = ({ boardTitle = 'my ui' }) => {
  // --- States for Panels and Modal ---
  const [isSidekickOpen, setIsSidekickOpen] = useState(false);
  const [isIntegrateOpen, setIsIntegrateOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // --- Invitation States ---
  const [emailInput, setEmailInput] = useState('');
  const [inviteCount, setInviteCount] = useState(1);
  const [isSending, setIsSending] = useState(false);

  // Mock list of members (in a real app, you'd fetch this from your DB)
  const [members, setMembers] = useState([
    { id: 1, name: 'Wasiullah123', email: 'wasi@gmail.com', role: 'Admin', status: 'active' }
  ]);

  // --- Handlers ---
  const handleSidekickClick = () => {
    setIsSidekickOpen(!isSidekickOpen);
    setIsIntegrateOpen(false);
    setIsInviteModalOpen(false);
  };

  const handleIntegrateClick = () => {
    setIsIntegrateOpen(!isIntegrateOpen);
    setIsSidekickOpen(false);
    setIsInviteModalOpen(false);
  };

  const handleInviteModalToggle = () => {
    setIsInviteModalOpen(!isInviteModalOpen);
    setIsSidekickOpen(false);
    setIsIntegrateOpen(false);
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    setIsSending(true);

    // This payload matches your backend "sendInvitations" controller
    const invitationPayload = {
      inviterUserId: "user_001", // Current user ID
      inviterName: "Wasiullah",
      inviterEmail: "wasi@gmail.com",
      accountName: "Wasiullah Organization",
      invitations: [
        { email: emailInput, role: 'Member' }
      ]
    };

    try {
      // Replace URL with your actual backend endpoint
      const response = await fetch('http://localhost:5000/api/invitations/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invitationPayload)
      });

      if (response.ok) {
        // Increment count and update local UI list
        setInviteCount(prev => prev + 1);
        setMembers([...members, {
          id: Date.now(),
          name: emailInput.split('@')[0],
          email: emailInput,
          role: 'Member',
          status: 'pending'
        }]);
        setEmailInput('');
      } else {
        alert("Failed to send invitation. Check console for errors.");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
    } finally {
      setIsSending(false);
    }
  };

  const integrations = [
    { id: 1, name: 'GitHub', icon: Github, color: 'text-gray-800', connected: false },
    { id: 2, name: 'GitLab', icon: Gitlab, color: 'text-orange-500', connected: false },
    { id: 3, name: 'Slack', icon: Slack, color: 'text-purple-500', connected: false },
    { id: 4, name: 'CircleCI', icon: Zap, color: 'text-gray-700', connected: true },
    { id: 5, name: 'Jira', icon: Grid, color: 'text-blue-500', connected: false },
  ];

  return (
    <>
      <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200 flex-shrink-0 relative z-30">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-normal text-gray-800 m-0">{boardTitle}</h2>
        </div>

        <div className="flex items-center gap-2 h-8 select-none">
          {/* Sidekick Button */}
          <button
            onClick={handleSidekickClick}
            className={`text-[13px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 rounded cursor-pointer transition-all hover:bg-gray-100 ${isSidekickOpen ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-800'}`}
          >
            <Sparkles size={18} className={isSidekickOpen ? 'text-purple-600' : 'text-gray-600'} />
            <span>Sidekick</span>
          </button>

          {/* Integrate Button */}
          <button
            onClick={handleIntegrateClick}
            className={`text-[13px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 rounded cursor-pointer transition-all hover:bg-gray-100 ${isIntegrateOpen ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800'}`}
          >
            <Shuffle size={18} className={isIntegrateOpen ? 'text-blue-600' : 'text-gray-600'} />
            <span>Integrate</span>
          </button>

          {/* Automate Button */}
          <button className="text-[13px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 text-gray-800 hover:bg-gray-100 rounded">
            <Clock size={18} className="text-gray-600" />
            <span>Automate</span>
          </button>

          <div className="w-px h-4 bg-gray-300 mx-2" />

          {/* Avatar */}
          <div className="flex items-center justify-center w-7 h-7 bg-[#FF0D8B] text-white rounded-full text-xs font-semibold">A</div>

          {/* --- INVITE BUTTON --- */}
          <button
            onClick={handleInviteModalToggle}
            className="text-[13px] inline-flex items-center justify-center px-3 py-1.5 h-8 bg-transparent border border-gray-300 rounded text-gray-800 hover:bg-gray-50 transition-all"
          >
            Invite / {inviteCount}
          </button>

          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-all"><Link2 size={18} /></button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-all"><MoreHorizontal size={20} /></button>
        </div>
      </header>

      {/* --- INVITATION MODAL --- */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[560px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Invite to this board</h3>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600"><MessageSquareText size={20} /></button>
                <button onClick={handleInviteModalToggle} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 pt-4">
              {/* Input Form */}
              <form onSubmit={handleSendInvite} className="relative flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Search by name, team, or email address"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending || !emailInput}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 disabled:opacity-50 transition-all"
                >
                  {isSending ? <Loader2 size={18} className="animate-spin" /> : 'Invite'}
                </button>
              </form>

              {/* Organization Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-8">
                <Grid size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700">Anyone at <span className="font-semibold text-gray-900">Wasiullah Organization</span> can access this board</span>
              </div>

              {/* People List */}
              <div>
                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">People invited to this board</h4>
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${member.status === 'pending' ? 'bg-gray-200' : 'bg-purple-600'} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                          {member.status === 'pending' ? <Mail size={16} className="text-gray-500" /> : member.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {member.name}
                            {member.status === 'pending' && <span className="ml-2 text-[10px] text-gray-500 font-normal">Invitation pending</span>}
                          </p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {member.role === 'Admin' ? (
                          <Crown size={18} className="text-blue-500" />
                        ) : (
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Send size={16} className="text-gray-400 hover:text-blue-600 cursor-pointer" title="Resend invite" />
                            <X size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidekick Panel */}
      {isSidekickOpen && (
        <div className="fixed right-0 top-20 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-purple-600" />
              <h3 className="text-lg font-medium text-gray-800">Sidekick</h3>
            </div>
            <button onClick={() => setIsSidekickOpen(false)} className="p-1.5 rounded hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Hey Wasiullah,</p>
                <p className="text-gray-600 mt-1">How can I help you move forward with this board?</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Message AI Sidekick..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <MessageSquareText className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      )}

      {/* Integrate Panel */}
      {isIntegrateOpen && (
        <div className="fixed right-0 top-20 bottom-0 w-[400px] bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Shuffle size={20} className="text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">Integrate</h3>
            </div>
            <button onClick={() => setIsIntegrateOpen(false)} className="p-1.5 rounded hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Recommended</h4>
            <div className="space-y-3">
              {integrations.map((app) => (
                <div key={app.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${app.connected ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <app.icon size={20} className={app.color} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{app.name}</p>
                      <p className="text-xs text-gray-500">Connect to sync data</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-blue-600 hover:underline">
                    {app.connected ? 'Manage' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardHeader;