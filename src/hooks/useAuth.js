export const login = (userObj) => {
    localStorage.setItem('user', JSON.stringify(userObj));
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getUser = () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
};

export const isAdmin = () => {
    const user = getUser();
    return user?.role === 'admin';
};

export const isAuthenticated = () => {
    return !!getUser();
};
