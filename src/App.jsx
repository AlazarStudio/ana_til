import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EditTheme from './pages/EditTheme';
import EditLesson from './pages/EditLesson';
import PrivateRoute from './components/PrivateRoute';
import UserHome from './pages/UserHome';
import UserLessons from './pages/UserLessons';
import UserLessonView from './pages/UserLessonView';
import UserQuiz from './pages/UserQuiz';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import DictionarySimple from './pages/DictionarySimple';
import InstallButton from "./InstallButton/InstallButton";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/theme/:themeId"
            element={
              <PrivateRoute role="admin">
                <EditTheme />
              </PrivateRoute>
            }
          />
          <Route
            path="/theme/:themeId/lesson/:lessonId"
            element={
              <PrivateRoute role="admin">
                <EditLesson />
              </PrivateRoute>
            }
          />

          <Route
            path="/user"
            element={
              <PrivateRoute role="user">
                <UserHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/theme/:themeId"
            element={
              <PrivateRoute role="user">
                <UserLessons />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/theme/:themeId/lesson/:lessonId"
            element={
              <PrivateRoute role="user">
                <UserLessonView />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/theme/:themeId/lesson/:lessonId/quiz"
            element={
              <PrivateRoute role="user">
                <UserQuiz />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/profile"
            element={
              <PrivateRoute role="user">
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/dictionary"
            element={
              <PrivateRoute role="user">
                <DictionarySimple />
              </PrivateRoute>
            }
          />

          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>

      {/* Кнопка установки */}
      <InstallButton />
    </>
  );
}

export default App;
