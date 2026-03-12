import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUsers, HiOutlineUserGroup, HiOutlineChartBar } from 'react-icons/hi';

function Welcome() {
  return (
    <div className="container">
      <div className="welcome-header">
        <h1 className="page-title">Система управления пользователями</h1>
        <p className="page-subtitle">
          Эффективное управление сотрудниками и группами в вашей организации
        </p>
      </div>

      <div className="welcome-grid">
        <Link to="/users" className="welcome-card">
          <div className="welcome-icon blue">
            <HiOutlineUsers />
          </div>
          <h3>Управление пользователями</h3>
          <p>Просматривайте, добавляйте и удаляйте пользователей. Удобный поиск и сортировка помогут быстро найти нужную информацию.</p>
        </Link>

        <Link to="/groups" className="welcome-card">
          <div className="welcome-icon green">
            <HiOutlineUserGroup />
          </div>
          <h3>Группы сотрудников</h3>
          <p>Анализируйте распределение сотрудников по группам. Визуальное представление структуры организации.</p>
        </Link>

        <div className="welcome-card">
          <div className="welcome-icon purple">
            <HiOutlineChartBar />
          </div>
          <h3>Статистика</h3>
          <p>Всего сотрудников: <strong>18</strong></p>
        </div>
      </div>

      <div className="feature-list">
        <h2 style={{ marginBottom: '30px', color: '#333' }}>Особенности системы</h2>
        
        <div className="feature-item">
          <div className="feature-check">✓</div>
          <div className="feature-text">
            <h4>Полный контроль</h4>
            <p>Добавление и удаление пользователей в один клик</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-check">✓</div>
          <div className="feature-text">
            <h4>Быстрый поиск</h4>
            <p>Мгновенный поиск по всем полям таблицы</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-check">✓</div>
          <div className="feature-text">
            <h4>Умная сортировка</h4>
            <p>Сортировка по любому столбцу таблицы</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-check">✓</div>
          <div className="feature-text">
            <h4>Группировка данных</h4>
            <p>Визуальное представление групп сотрудников</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;