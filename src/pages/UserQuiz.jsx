import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { markLessonPassed } from '../services/dataService';


const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const UserQuiz = () => {
  const { themeId, lessonId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const themes = getThemes();
    const lesson = themes?.[themeId]?.lessons?.[lessonId];
    if (!lesson) return;

    const cards = Object.values(lesson.cards);
    const quiz = cards.map((card) => {
      const wrongOptions = cards
        .filter((c) => c.id !== card.id)
        .slice(0, 3)
        .map((c) => c.translation);

      return {
        word: card.word,
        correct: card.translation,
        options: shuffle([card.translation, ...wrongOptions])
      };
    });

    setQuestions(shuffle(quiz));
  }, [themeId, lessonId]);

  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    const isCorrect = option === questions[current].correct;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => [...prev, option]);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setCompleted(true);
    }
  };

  const handleFinish = () => {
    const correctWords = questions
      .filter((q, i) => q.correct === answers[i]) // answers — массив ответов
      .map((q) => q.word); // сохраним слово
  
    markLessonPassed(themeId, lessonId, correctWords);
    navigate(`/user/theme/${themeId}`);
  };

  const currentQuestion = questions[current];

  return (
    <>
      <Header />
      <Box p={2}>
        <BackButton to={`/user/theme/${themeId}/lesson/${lessonId}`} />

        {!completed && currentQuestion && (
          <>
            <Typography variant="h6" mb={2} textAlign="center">
              Как переводится: <strong>{currentQuestion.word}</strong>?
            </Typography>

            <Stack spacing={2}>
              {currentQuestion.options.map((option, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </Stack>
          </>
        )}

        {completed && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" mb={1}>Результат</Typography>
            <Typography variant="h6" mb={2}>
              {score} из {questions.length} правильных
            </Typography>
            <Button variant="contained" onClick={handleFinish}>
              Сохранить результат
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default UserQuiz;
