import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { HiOutlineUsers, HiOutlineUserGroup, HiOutlineHome } from 'react-icons/hi';
import Welcome from './pages/Welcome';
import Users from './pages/Users';
import Groups from './pages/Groups';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <NavLink to="/" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <HiOutlineHome />
              Главная
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <HiOutlineUsers />
              Пользователи
            </NavLink>
            <NavLink to="/groups" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <HiOutlineUserGroup />
              Группы
            </NavLink>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/users" element={<Users />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;