import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/dataService';

import { useEffect } from 'react';
import { getRole } from '../services/dataService';

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper
} from '@mui/material';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = loginUser(login, password);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'user') {
      navigate('/user');
    } else {
      setError('Неверный логин или пароль');
    }
  };


  useEffect(() => {
    const role = getRole();
    if (role === 'admin') navigate('/admin');
    if (role === 'user') navigate('/user');
  }, []);


  return (
    <Box p={2} sx={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Вход
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            fullWidth
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Войти
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/register')}
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </Stack>
      </Paper>

      {error && (
        <Typography color="error" mt={2} textAlign="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
