const {promises: fs} = require("fs");
const path = require("path");
const environmentProvider = require('../configProvider');
const tokens = new Set();
const tokenFileName = 'token';

const getToken = () => {
    return [...tokens];
}

const setToken = (token) => {
    tokens.add(token);
}

const removeToken = (token) => {
    tokens.delete(token);
}

const persistTokens = async () => {
    const content = JSON.stringify([...tokens])
    const filePath = path.join(environmentProvider.getCacheLocation(), tokenFileName);
    await fs.mkdir(environmentProvider.getCacheLocation(), {recursive: true});
    await fs.writeFile(filePath, content, 'utf8');
}

const loadTokens = async () => {
    const loadedTokens = await readTokens();
    loadedTokens.forEach(tokens.add, tokens)
    console.log(`${tokens.size} tokens loaded.`)
}

const resetTokens = () => {
    tokens.clear();
}

const readTokens = async () => {
    try {
        const filePath = path.join(environmentProvider.getCacheLocation(), tokenFileName);
        return new Set(JSON.parse(await fs.readFile(filePath, 'utf8')));
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('Error happen while load tokens' + err);
        }
        return new Set();
    }
}

module.exports = {
    getToken, setToken,
    removeToken, persistTokens,
    loadTokens, resetTokens
};