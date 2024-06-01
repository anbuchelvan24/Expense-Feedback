import React from 'react';
import { MdExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { 
  Container, Typography, TextField, FormControl, InputLabel, 
  Select, MenuItem, Grid, Box, IconButton, Button, Checkbox, FormControlLabel 
} from '@mui/material';
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
      <a href='/home'>
        <img className="navbar-logo" src={logo} alt="logo" />
      </a>
      <ul className="menu">
        <li>
          <button
            className='logout-button'
            onClick={handleLogout}
            style={{
              
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
