const tokens = new Set();

const getToken = () => {
    return [...tokens];
}

const setToken = (token) => {
    tokens.add(token);
}

module.exports = {getToken,setToken};