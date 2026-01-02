const {promises: fs} = require("fs");
const path = require("path");
const environmentProvider = require('../configProvider');
const tokens = new Set();

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
        const filePath = path.join(environmentProvider.getCacheLocation(), 'token');
        await fs.mkdir(environmentProvider.getCacheLocation(), {recursive: true});
        await fs.writeFile(filePath, content, 'utf8');
    }
}

const loadTokens = async () => {
    const loadedTokens = await readTokens();
    tokens.union(loadedTokens);
    console.log(`${loadedTokens.size} tokens loaded.`)
}

const readTokens = async () => {
    try {
        return new Set(JSON.parse(await fs.readFile(environmentProvider.getCacheLocation(), 'utf8')));
    } catch (err) {
        console.error('Error happen while load tokens' + err);
        return new Set();
    }
}

module.exports = {getToken, setToken, removeToken, loadTokens};