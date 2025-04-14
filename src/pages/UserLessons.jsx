import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  Stack,
  Paper,
  Button
} from '@mui/material';

import Header from '../components/Header';
import BackButton from '../components/BackButton';

import { getThemes, getPassedLessons, getLearnedWords } from '../services/dataService';
import LinearProgress from '@mui/material/LinearProgress';


const UserLessons = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(null);
  const [lessonPassed, setLessonPassed] = useState({});

  const [wordProgress, setWordProgress] = useState({});

  useEffect(() => {
    const themes = getThemes();
    const selected = themes?.[themeId];

    if (!selected) {
      navigate('/user');
      return;
    }

    setTheme(selected);

    const passed = getPassedLessons();
    const themeProgress = passed?.[themeId] || {};
    setLessonPassed(themeProgress);

    const learned = getLearnedWords();

    // Подсчёт прогресса по словам
    const wordProg = {};
    for (const [lessonId, lesson] of Object.entries(selected.lessons || {})) {
      const allWords = Object.values(lesson.cards || {}).map((c) => c.word);
      const learnedCount = allWords.filter((word) => learned.includes(word)).length;
      const totalCount = allWords.length;
      const percent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

      wordProg[lessonId] = {
        learned: learnedCount,
        total: totalCount,
        percent
      };
    }

    setWordProgress(wordProg);
  }, [themeId, navigate]);


  if (!theme) return null;

  return (
    <>
      <Header />
      <Box p={2}>
        <BackButton to="/user" />
        <Typography variant="h5" mb={2} textAlign="center">
          {theme.title}
        </Typography>

        <Stack spacing={2}>
          {Object.values(theme.lessons).map((lesson) => (
            <Paper key={lesson.id} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box width="100%">
                  <Typography variant="subtitle1">{lesson.title}</Typography>

                  {wordProgress[lesson.id] && (
                    <>
                      <Typography variant="caption" color="text.secondary">
                        Выучено слов: {wordProgress[lesson.id].learned} / {wordProgress[lesson.id].total}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={wordProgress[lesson.id].percent}
                        sx={{ mt: 0.5, height: 6, borderRadius: 4 }}
                      />
                    </>
                  )}
                </Box>

                <Button
                  size="small"
                  variant="contained"
                  onClick={() =>
                    navigate(`/user/theme/${themeId}/lesson/${lesson.id}`)
                  }
                  sx={{ ml: 2 }}
                >
                  Начать
                </Button>
              </Box>
            </Paper>
          ))}

        </Stack>
      </Box>
    </>
  );
};

export default UserLessons;
