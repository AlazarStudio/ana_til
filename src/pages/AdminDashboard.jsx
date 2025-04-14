import React, { useEffect, useState } from 'react';
import { getThemes, addTheme, deleteTheme } from '../services/dataService';

import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [themes, setThemes] = useState({});
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const loaded = getThemes();
    setThemes(loaded);
  }, []);

  const handleAddTheme = () => {
    if (!title.trim()) return;
    addTheme(title);
    const updated = getThemes();
    setThemes(updated);
    setTitle('');
    setIcon('');
  };

  const handleDelete = (id) => {
    deleteTheme(id);
    const updated = getThemes();
    setThemes(updated);
  };

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box p={2}>
        <Typography variant="h5" mb={2} textAlign="center">
          Панель администратора
        </Typography>

        {/* Форма добавления темы */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" mb={1}>
            Добавить новую тему
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Название темы"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddTheme}
              sx={{ mt: 1 }}
            >
              Добавить тему
            </Button>
          </Stack>
        </Paper>

        {/* Список тем */}
        <Typography variant="h6" mb={1}>
          Список тем
        </Typography>

        <Stack spacing={2}>
          {Object.values(themes).map((theme) => (
            <Paper
              key={theme.id}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body1">{theme.title}</Typography>

              <Box>
                <IconButton onClick={() => navigate(`/theme/${theme.id}`)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(theme.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;
