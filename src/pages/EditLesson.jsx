import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getThemes,
  addCard,
  deleteCard
} from '../services/dataService';

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Paper
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

const EditLesson = () => {
  const { themeId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  useEffect(() => {
    const themes = getThemes();
    const foundLesson = themes?.[themeId]?.lessons?.[lessonId];
    if (!foundLesson) {
      navigate(`/theme/${themeId}`);
      return;
    }
    setLesson(foundLesson);
  }, [themeId, lessonId, navigate]);

  const handleAddCard = () => {
    if (!newWord.trim() || !newTranslation.trim()) return;
    addCard(themeId, lessonId, newWord, newTranslation);
    const updated = getThemes()?.[themeId]?.lessons?.[lessonId];
    setLesson(updated);
    setNewWord('');
    setNewTranslation('');
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(themeId, lessonId, cardId);
    const updated = getThemes()?.[themeId]?.lessons?.[lessonId];
    setLesson(updated);
  };

  if (!lesson) return null;

  return (
    <Box p={2}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/theme/${themeId}`)}
        sx={{ mb: 2 }}
      >
        Назад
      </Button>

      <Typography variant="h5" mb={2}>
        Урок: {lesson.title}
      </Typography>

      <Stack spacing={2} mb={3}>
        {Object.values(lesson.cards).map((card) => (
          <Paper
            key={card.id}
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography>{card.word}</Typography>
              <Typography variant="caption" color="text.secondary">
                Перевод: {card.translation}
              </Typography>
            </Box>
            <IconButton onClick={() => handleDeleteCard(card.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Stack>

      <Typography variant="h6" mb={1}>Добавить слово</Typography>
      <Stack spacing={2}>
        <TextField
          label="Карачаевское слово"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          fullWidth
        />
        <TextField
          label="Перевод"
          value={newTranslation}
          onChange={(e) => setNewTranslation(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddCard} fullWidth>
          Добавить слово
        </Button>
      </Stack>
    </Box>
  );
};

export default EditLesson;
