import React from 'react';
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import logo from '../assets/CostoSight.png';

const NavBar = () => {
  const navigate = useNavigate(); 

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='main-nav'>
      <img className="navbar-logo" src={logo} alt="logo"/>
      <ul className="menu">
        <li>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              color: 'white',
              alignItems: 'center',
              gap: '3px',
              backgroundColor: 'red',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '3px',
              paddingBottom: '3px'
            }}
          >
            Logout <MdExitToApp style={{ height: '20px', width: 'auto' }} />
          </button>
        </li>
        <p style={{ marginRight: '0px', color:'white' }}>Hello, {storedUser ? storedUser.firstName : "Guest"}</p>
        <li><a href='/policies'>Policies</a></li>
        <li><a href="/home">Home</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
