import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button
} from '@mui/material';

import {
  getLearnedWords,
  getPassedLessons,
  getLogin,
  getThemes,
  logout
} from '../services/dataService';

import Header from '../components/Header';

const UserProfile = () => {
  const [learnedWords, setLearnedWords] = useState([]);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [login, setLogin] = useState('');

  useEffect(() => {
    setLogin(getLogin());

    const passed = getPassedLessons();
    const total = Object.values(passed).reduce(
      (acc, theme) => acc + Object.keys(theme).length,
      0
    );
    setLessonsCount(total);

    const words = getLearnedWords();
    setLearnedWords(words);
  }, []);

  const handleReset = () => {
    localStorage.removeItem('ana-til-progress');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Box p={2}>
        <Typography variant="h5" mb={2} textAlign="center">
          Профиль: {login}
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography>Пройдено уроков: <strong>{lessonsCount}</strong></Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleReset}
            fullWidth
          >
            Сбросить прогресс
          </Button>
        </Paper>

        <Typography variant="h6" mb={1}>Выученные слова</Typography>

        {learnedWords.length === 0 ? (
          <Typography color="text.secondary">Пока ничего не выучено</Typography>
        ) : (
          <Stack spacing={1}>
            {learnedWords.map((word, index) => (
              <Paper key={index} sx={{ p: 1 }}>
                {word}
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default UserProfile;
