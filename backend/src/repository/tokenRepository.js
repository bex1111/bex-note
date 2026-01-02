const {promises: fs} = require("fs");
const path = require("path");
const environmentProvider = require('../configProvider');
const tokens = new Set();
const tokenFileName = 'token';

const getToken = () => {
    return [...tokens];
}

const setToken = async (token) => {
    tokens.add(token);
    await persistTokens()
}

const removeToken = async (token) => {
    tokens.delete(token);
    await persistTokens();
}

const persistTokens = async () => {
    if (tokens.size > 0) {
        const content = JSON.stringify([...tokens])
        const filePath = path.join(environmentProvider.getCacheLocation(), tokenFileName);
        await fs.mkdir(environmentProvider.getCacheLocation(), {recursive: true});
        await fs.writeFile(filePath, content, 'utf8');
    }
}

const loadTokens = async () => {
    const loadedTokens = await readTokens();
    loadedTokens.forEach(tokens.add, tokens)
    console.log(`${tokens.size} tokens loaded.`)
}

const readTokens = async () => {
    try {
        const filePath = path.join(environmentProvider.getCacheLocation(), tokenFileName);
        return new Set(JSON.parse(await fs.readFile(filePath, 'utf8')));
    } catch (err) {
        console.error('Error happen while load tokens' + err);
        return new Set();
    }
}

module.exports = {getToken, setToken, removeToken, loadTokens};