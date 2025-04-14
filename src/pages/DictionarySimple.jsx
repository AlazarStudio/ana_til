import React, { useState, useEffect } from 'react';
import karaToRu from '../data/dictionary_karach.json';
import ruToKara from '../data/dictionary_ru.json';

import {
  Box,
  Typography,
  TextField,
  Stack,
  Paper,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

import Header from '../components/Header';
import BackButton from '../components/BackButton';

const DictionarySimple = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState('kara'); // 'kara' or 'ru'

  const handleDirectionChange = (_, newDirection) => {
    if (newDirection) {
      setDirection(newDirection);
      setQuery('');
      setResults([]);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const source = direction === 'kara' ? karaToRu : ruToKara;

      const filtered = source.filter((entry) =>
        entry.word.toLowerCase().includes(q)
      );

      setResults(filtered);
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query, direction]);

  return (
    <>
      <Header />
      <Box p={2}>
        <BackButton to="/user" />
        <Typography variant="h5" mb={2} textAlign="center">
          Словарь
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          <ToggleButtonGroup
            value={direction}
            exclusive
            onChange={handleDirectionChange}
            color="primary"
          >
            <ToggleButton value="kara" sx={{fontSize: '12px', padding: '10px'}}>Карачаевский → Русский</ToggleButton>
            <ToggleButton value="ru" sx={{fontSize: '12px', padding: '10px'}}>Русский → Карачаевский</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          label={
            direction === 'kara'
              ? 'Слово на карачаевском'
              : 'Слово на русском'
          }
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 3 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stack spacing={2}>
              {results.map((entry, idx) => (
                <Paper key={idx} sx={{ p: 2 }}>
                  <Typography variant="h6">{entry.word}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.translation}
                  </Typography>
                </Paper>
              ))}
            </Stack>

            {query && results.length === 0 && (
              <Typography textAlign="center" mt={3} color="text.secondary">
                Ничего не найдено
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default DictionarySimple;
