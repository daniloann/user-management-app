import React from 'react';

function GroupCard({ group, users, color }) {
  const groupUsers = users.filter(user => user.group === group);
  
  return (
    <div className="card">
      <div style={{ 
        height: '5px', 
        background: color === 'blue' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                    color === 'green' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' :
                    color === 'purple' ? 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)' :
                    'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
        borderRadius: '15px 15px 0 0',
        margin: '-25px -25px 20px -25px'
      }}></div>
      
      <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
        {group === 'Unmanaged' ? 'Без группы' : group.replace('CDN/', '')}
      </h3>
      
      <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        {groupUsers.length}
        <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginLeft: '10px' }}>
          сотрудников
        </span>
      </p>
      
      <div>
        <h4 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Сотрудники:</h4>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {groupUsers.map(user => (
            <div key={user.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%'
              }}></div>
              <span style={{ fontSize: '14px', color: '#555' }}>{user.fullName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;