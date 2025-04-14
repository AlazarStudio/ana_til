import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getThemes,
  updateTheme,
  addLesson,
  deleteLesson
} from '../services/dataService';

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Paper
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

const EditTheme = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');

  useEffect(() => {
    const themes = getThemes();
    const selected = themes[themeId];
    if (!selected) {
      navigate('/');
      return;
    }
    setTheme(selected);
    setTitle(selected.title);
  }, [themeId, navigate]);

  const handleSaveTheme = () => {
    updateTheme(themeId, { title });
    const updated = getThemes()[themeId];
    setTheme(updated);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) return;
    addLesson(themeId, newLessonTitle);
    const updated = getThemes()[themeId];
    setTheme(updated);
    setNewLessonTitle('');
  };

  const handleDeleteLesson = (lessonId) => {
    deleteLesson(themeId, lessonId);
    const updated = getThemes()[themeId];
    setTheme(updated);
  };

  if (!theme) return null;

  return (
    <Box p={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Назад
      </Button>

      <Typography variant="h5" mb={2}>
        Редактирование темы
      </Typography>

      <Stack spacing={2} mb={3}>
        <TextField
          label="Название темы"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSaveTheme}>
          Сохранить изменения
        </Button>
      </Stack>

      <Typography variant="h6" mb={1}>
        Уроки
      </Typography>

      <Stack spacing={2} mb={3}>
        {Object.values(theme.lessons).map((lesson) => (
          <Paper
            key={lesson.id}
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography>{lesson.title}</Typography>
            <Box>
              <IconButton
                onClick={() => navigate(`/theme/${themeId}/lesson/${lesson.id}`)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteLesson(lesson.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="Название нового урока"
          value={newLessonTitle}
          onChange={(e) => setNewLessonTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddLesson} fullWidth>
          Добавить урок
        </Button>
      </Stack>
    </Box>
  );
};

export default EditTheme;
