import React from 'react';

const DonorGettingStarted = () => {
  return (
    <div style={{
      width: '100%',
      height: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e6e9ef',
        background: '#fff'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#323338',
          margin: 0
        }}>
          Getting Started - Donor Management
        </h1>
      </div>
      
      <iframe
        src="https://staffadmnhydroplannings-team.monday.com/docs/5025572455"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Donor Getting Started"
      />
    </div>
  );
};

export default DonorGettingStarted;