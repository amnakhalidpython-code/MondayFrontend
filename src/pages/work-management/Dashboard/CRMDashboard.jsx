import React from 'react'
import MondayCRMNavbar from '../../../components/mondayCRM-navbar/MondayCRMNavbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import MondayHeader from '../../../components/mondayCRM-navbar/MondayHeader'

const CRMDashboard = () => {
  return (
    <div className="min-h-screen bg-[#e1eff2]">
      {/* Top Navbar - Full Width - ORIGINAL */}
      <MondayCRMNavbar />
      
      {/* Main Layout: Sidebar (Left) + Content (Right) */}
      <div className="flex">
        {/* Left Sidebar - Fixed Width - ORIGINAL */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Right Side Content - Takes Remaining Space */}
        <div className="flex-1">
          {/* Header - No Extra Padding */}
          <MondayHeader />
          
          {/* Main Content Area */}
          <div className="p-6">
            {/* Yahan aap apna baaki content add kar sakte hain */}
            {/* For example: Recent boards, cards, etc. */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CRMDashboard