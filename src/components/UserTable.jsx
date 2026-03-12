import React, { useState, useMemo, useCallback } from 'react';
import { HiOutlineSearch, HiOutlineSortAscending, HiOutlineSortDescending, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

function UserTable({ users, onDeleteUser, onAddUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    username: '',
    email: '',
    group: '',
    phone: ''
  });

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return users.filter(user => 
      user.fullName.toLowerCase().includes(lowerSearchTerm) ||
      user.username.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.group.toLowerCase().includes(lowerSearchTerm) ||
      user.phone.includes(lowerSearchTerm)
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    const sortableUsers = [...filteredUsers];
    sortableUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  const requestSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (newUser.fullName && newUser.username && newUser.email) {
      onAddUser({
        ...newUser,
        id: Date.now(),
        username: `companydomain/${newUser.username}`,
        email: `${newUser.email}@companydomain.com`,
        group: newUser.group || 'Unmanaged'
      });
      setNewUser({ fullName: '', username: '', email: '', group: '', phone: '' });
      setShowAddForm(false);
    }
  }, [newUser, onAddUser]);

  const getSortIcon = useCallback((key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <HiOutlineSortAscending className="sort-icon" /> : 
      <HiOutlineSortDescending className="sort-icon" />;
  }, [sortConfig]);

  return (
    <div className="table-container">
      <div className="search-container">
        <div className="search-box">
          <HiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Поиск пользователей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
        >
          <HiOutlinePlus />
          Добавить пользователя
        </button>
      </div>

      {showAddForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Полное имя *"
                value={newUser.fullName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя *"
                value={newUser.username}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email (локальная часть) *"
                value={newUser.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="group"
                placeholder="Группа"
                value={newUser.group}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={newUser.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-success">
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn btn-danger"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => requestSort('fullName')}>
              Полное имя {getSortIcon('fullName')}
            </th>
            <th onClick={() => requestSort('username')}>
              Учетная запись {getSortIcon('username')}
            </th>
            <th onClick={() => requestSort('email')}>
              Электронная почта {getSortIcon('email')}
            </th>
            <th onClick={() => requestSort('group')}>
              Группа {getSortIcon('group')}
            </th>
            <th onClick={() => requestSort('phone')}>
              Номер телефона {getSortIcon('phone')}
            </th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={`group-badge ${
                  user.group === 'Unmanaged' 
                    ? 'group-badge-unmanaged' 
                    : 'group-badge-managed'
                }`}>
                  {user.group}
                </span>
              </td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="btn btn-danger"
                  style={{ padding: '8px 15px' }}
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0', background: '#f8f9fa' }}>
        <p style={{ color: '#666' }}>
          Всего записей: {sortedUsers.length} (отфильтровано из {users.length})
        </p>
      </div>
    </div>
  );
}

export default UserTable;