import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/dataService';

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper
} from '@mui/material';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!login.trim() || !password.trim()) {
      setError('Введите логин и пароль');
      return;
    }

    const result = registerUser(login.trim(), password.trim());

    if (result.success) {
      navigate('/user');
    } else {
      setError(result.message);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={3} textAlign="center">
        Регистрация нового пользователя
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
          <Button variant="contained" fullWidth onClick={handleRegister}>
            Зарегистрироваться
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

export default Register;
