import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemes } from '../services/dataService';

import {
  Box,
  Typography,
  Paper,
  Stack,
  Button
} from '@mui/material';

import Header from '../components/Header';
import { getPassedLessons } from '../services/dataService';
import LinearProgress from '@mui/material/LinearProgress';



const UserHome = () => {
  const [themes, setThemes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const themes = getThemes();
    const passed = getPassedLessons();

    const themesWithProgress = Object.fromEntries(
      Object.entries(themes).map(([id, theme]) => {
        const totalLessons = Object.keys(theme.lessons || {}).length;
        const passedLessons = Object.keys(passed?.[id] || {}).length;
        const progressPercent = totalLessons > 0
          ? Math.round((passedLessons / totalLessons) * 100)
          : 0;

        return [id, {
          ...theme,
          progressPercent,
          progressText: `${passedLessons} / ${totalLessons}`
        }];
      })
    );

    setThemes(themesWithProgress);

  }, []);

  return (
    <>
      <Header />
      <Box p={2}>
        <Typography variant="h5" mb={2} textAlign="center">
          Выбери тему
        </Typography>

        <Stack spacing={2}>
          {Object.values(themes).map((theme) => (
            <Paper key={theme.id} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box width="100%">
                  <Typography variant="subtitle1">{theme.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Прогресс: {theme.progressText}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={theme.progressPercent}
                    sx={{ mt: 1, height: 6, borderRadius: 4 }}
                  />
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/user/theme/${theme.id}`)}
                  sx={{ ml: 2 }}
                >
                  Перейти
                </Button>
              </Box>
            </Paper>
          ))}


        </Stack>
      </Box>
    </>
  );
};

export default UserHome;
