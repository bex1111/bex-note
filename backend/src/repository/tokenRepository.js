const tokens = new Set();

const getToken = () => {
    return [...tokens];
}

const setToken = (token) => {
    tokens.add(token);
}

const removeToken = (token) => {
    tokens.delete(token);
}

module.exports = {getToken,setToken,removeToken};