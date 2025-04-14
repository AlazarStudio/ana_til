import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getThemes } from '../services/dataService';

import {
  Box,
  Typography,
  Button,
  Stack,
  Paper
} from '@mui/material';

import Header from '../components/Header';
import BackButton from '../components/BackButton';

const UserLessonView = () => {
  const { themeId, lessonId } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lessonTitle, setLessonTitle] = useState('');

  useEffect(() => {
    const themes = getThemes();
    const lesson = themes?.[themeId]?.lessons?.[lessonId];

    if (!lesson) {
      navigate(`/user/theme/${themeId}`);
      return;
    }

    const sortedCards = Object.values(lesson.cards || {});
    setCards(sortedCards);
    setLessonTitle(lesson.title);
  }, [themeId, lessonId, navigate]);

  const currentCard = cards[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  if (!currentCard) {
    return (
      <>
        <Header />
        <Box p={2}>
          <Typography textAlign="center" variant="h6">В этом уроке пока нет слов</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box p={2}>
        <BackButton to={`/user/theme/${themeId}`} />
        <Typography variant="h5" textAlign="center" mb={2}>{lessonTitle}</Typography>

        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" textAlign="center" mb={1}>
            {currentCard.word}
          </Typography>
          <Typography variant="subtitle1" textAlign="center" color="text.secondary">
            Перевод: {currentCard.translation}
          </Typography>
        </Paper>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={handlePrev} disabled={currentIndex === 0}>
            Назад
          </Button>
          <Button variant="contained" onClick={handleNext} disabled={currentIndex === cards.length - 1}>
            Далее
          </Button>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => navigate(`/user/theme/${themeId}/lesson/${lessonId}/quiz`)}
        >
          Пройти тест
        </Button>
      </Box>
    </>
  );
};

export default UserLessonView;
