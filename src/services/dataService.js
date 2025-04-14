const STORAGE_KEY = 'ana-til-data';

// Генерация простого уникального ID (вместо nanoid)
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Получение данных из localStorage
const getData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { themes: {} };
};

// Сохранение данных в localStorage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Получить все темы
export const getThemes = () => {
  const data = getData();
  return data.themes;
};

// Добавить новую тему
export const addTheme = (title) => {
  const data = getData();
  const id = generateId();
  data.themes[id] = {
    id,
    title,
    lessons: {}
  };
  saveData(data);
  return id;
};

// Обновить тему по ID
export const updateTheme = (id, updatedFields) => {
  const data = getData();
  if (data.themes[id]) {
    const { title } = updatedFields; // оставим только title
    data.themes[id] = {
      ...data.themes[id],
      title
    };
    saveData(data);
  }
};

// Удалить тему по ID
export const deleteTheme = (id) => {
  const data = getData();
  if (data.themes[id]) {
    delete data.themes[id];
    saveData(data);
  }
};

// Уроки в теме

// Добавить урок
export const addLesson = (themeId, lessonTitle) => {
  const data = getData();
  const theme = data.themes[themeId];
  if (!theme) return;

  const lessonId = generateId();
  theme.lessons[lessonId] = {
    id: lessonId,
    title: lessonTitle,
    cards: {} // пока пусто
  };

  saveData(data);
  return lessonId;
};

// Удалить урок
export const deleteLesson = (themeId, lessonId) => {
  const data = getData();
  const theme = data.themes[themeId];
  if (theme?.lessons?.[lessonId]) {
    delete theme.lessons[lessonId];
    saveData(data);
  }
};

// Обновить урок
export const updateLesson = (themeId, lessonId, updatedFields) => {
  const data = getData();
  const lesson = data.themes?.[themeId]?.lessons?.[lessonId];
  if (lesson) {
    data.themes[themeId].lessons[lessonId] = {
      ...lesson,
      ...updatedFields
    };
    saveData(data);
  }
};

// Добавить карточку в урок
export const addCard = (themeId, lessonId, word, translation) => {
  const data = getData();
  const lesson = data.themes?.[themeId]?.lessons?.[lessonId];
  if (!lesson) return;

  const cardId = generateId();
  lesson.cards[cardId] = {
    id: cardId,
    word,
    translation
  };

  saveData(data);
  return cardId;
};

// Удалить карточку из урока
export const deleteCard = (themeId, lessonId, cardId) => {
  const data = getData();
  if (data.themes?.[themeId]?.lessons?.[lessonId]?.cards?.[cardId]) {
    delete data.themes[themeId].lessons[lessonId].cards[cardId];
    saveData(data);
  }
};


const USERS_KEY = 'ana-til-users';

// Начальные пользователи (при первом запуске)
const defaultUsers = {
  admin: {
    login: 'admin',
    password: 'admin',
    role: 'admin'
  },
  user1: {
    login: 'user1',
    password: 'user1',
    role: 'user'
  }
};

// Получить всех пользователей
export const getUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Авторизация
export const loginUser = (login, password) => {
  const users = getUsers();
  for (const key in users) {
    const user = users[key];
    if (user.login === login && user.password === password) {
      localStorage.setItem('role', user.role);
      localStorage.setItem('userLogin', login);
      return user.role;
    }
  }
  return null;
};

// Проверка роли
export const getRole = () => localStorage.getItem('role') || null;

// Выход
export const logout = () => {
  localStorage.removeItem('role');
  localStorage.removeItem('userLogin');
};

const PROGRESS_KEY = 'ana-til-progress';

// const getLogin = () => localStorage.getItem('userLogin');

export const getUserProgress = () => {
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : {};
};

export const markLessonPassed = (themeId, lessonId, correctWords = []) => {
  const login = getLogin();
  const data = getUserProgress();

  if (!data[login]) data[login] = { passedLessons: {}, learnedWords: [] };

  // Отметим урок
  if (!data[login].passedLessons[themeId]) {
    data[login].passedLessons[themeId] = {};
  }
  data[login].passedLessons[themeId][lessonId] = true;

  // Добавим слова
  data[login].learnedWords.push(...correctWords);
  // Убираем дубликаты
  data[login].learnedWords = Array.from(new Set(data[login].learnedWords));

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
};

export const getLearnedWords = () => {
  const login = getLogin();
  const data = getUserProgress();
  return data[login]?.learnedWords || [];
};

export const getPassedLessons = () => {
  const login = getLogin();
  const data = getUserProgress();
  return data[login]?.passedLessons || {};
};

export const getLogin = () => {
  return localStorage.getItem('userLogin');
};

export const registerUser = (login, password) => {
  const users = getUsers();

  // Проверка: логин уже существует
  const exists = Object.values(users).some((u) => u.login === login);
  if (exists) return { success: false, message: 'Логин уже занят' };

  const newUserKey = `user_${Date.now()}`;
  users[newUserKey] = {
    login,
    password,
    role: 'user'
  };

  localStorage.setItem('ana-til-users', JSON.stringify(users));
  localStorage.setItem('role', 'user');
  localStorage.setItem('userLogin', login);

  return { success: true };
};
