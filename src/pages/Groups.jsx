import React, { useState } from 'react';
import { HiOutlineUsers, HiOutlineUserGroup } from 'react-icons/hi';
import GroupCard from '../components/GroupCard';
import usersData from '../data.json'; // Исправленный путь

function Groups() {
  const [users] = useState(usersData.users);

  const groups = [...new Set(users.map(user => user.group))];
  
  const stats = {
    total: users.length,
    managed: users.filter(u => u.group !== 'Unmanaged').length,
    unmanaged: users.filter(u => u.group === 'Unmanaged').length
  };

  const colors = ['blue', 'green', 'purple', 'red', 'blue', 'green', 'purple', 'red'];

  return (
    <div className="container">
      <h1 className="page-title">Группы пользователей</h1>
      <p className="page-subtitle">
        Анализ распределения сотрудников по группам
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <HiOutlineUsers />
          </div>
          <div className="stat-info">
            <h3>Всего сотрудников</h3>
            <p>{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <HiOutlineUserGroup />
          </div>
          <div className="stat-info">
            <h3>В группах</h3>
            <p>{stats.managed}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gray">
            <HiOutlineUserGroup />
          </div>
          <div className="stat-info">
            <h3>Без группы</h3>
            <p>{stats.unmanaged}</p>
          </div>
        </div>
      </div>

      <div className="progress-container">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Распределение по группам</h3>
        {groups.map(group => {
          const count = users.filter(u => u.group === group).length;
          const percentage = (count / stats.total * 100).toFixed(1);
          
          return (
            <div key={group} className="progress-item">
              <div className="progress-header">
                <span>{group === 'Unmanaged' ? 'Без группы' : group.replace('CDN/', '')}</span>
                <span>{count} ({percentage}%)</span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${group === 'Unmanaged' ? 'gray' : ''}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-grid">
        {groups.map((group, index) => (
          <GroupCard 
            key={group} 
            group={group} 
            users={users}
            color={colors[index % colors.length]}
          />
        ))}
      </div>

      <div className="card" style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Детальный анализ групп</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Группа</th>
                <th>Количество</th>
                <th>Процент</th>
                <th>Сотрудники</th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => {
                const groupUsers = users.filter(u => u.group === group);
                return (
                  <tr key={group}>
                    <td>
                      <strong>
                        {group === 'Unmanaged' ? 'Без группы' : group.replace('CDN/', '')}
                      </strong>
                    </td>
                    <td>{groupUsers.length}</td>
                    <td>{((groupUsers.length / stats.total) * 100).toFixed(1)}%</td>
                    <td>
                      <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {groupUsers.map(u => u.fullName).join(', ')}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Groups;