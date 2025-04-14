import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, logout } from '../services/dataService';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';



const Header = () => {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" sx={{ borderRadius: '0px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ 'textDecoration': 'none', color: '#fff' }}><Typography style={{  fontWeight: 'bold' }}>Ана тил</Typography></Link>

        {role && role == 'user' && (<Button color="inherit" onClick={() => navigate('/user/dictionary')}>
          СЛОВАРЬ
        </Button>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {role && role == 'user' && (<AccountCircle onClick={() => navigate('/user/profile')} />)}
          {role && (<Logout onClick={handleLogout} />)}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
