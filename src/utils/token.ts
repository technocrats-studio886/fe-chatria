const getToken = () => {
    return sessionStorage.getItem('access_token');
}

const setToken = (token: string) => {
    sessionStorage.setItem('access_token', token);
}

const removeToken = () => {
    sessionStorage.removeItem('access_token');
}

export { getToken, setToken, removeToken };