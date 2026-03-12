import React, { useState, useCallback } from 'react';
import UserTable from '../components/UserTable';
import usersData from '../data.json'; // Исправленный путь

function Users() {
  const [users, setUsers] = useState(usersData.users);

  const handleDeleteUser = useCallback((userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  }, []);

  const handleAddUser = useCallback((newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Управление пользователями</h1>
      <p className="page-subtitle">
        Просмотр, добавление и удаление пользователей системы
      </p>

      <UserTable 
        users={users} 
        onDeleteUser={handleDeleteUser}
        onAddUser={handleAddUser}
      />
    </div>
  );
}

export default Users;