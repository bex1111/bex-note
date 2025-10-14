const crypto = require('crypto');
const environmentProvider = require('../environmentProvider');

const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};
let validTokens = [];

const checkAuthorize = (token) => {
    if (!token || !validTokens.includes(token)) {
        return unauthorizedResponse;
    }
    return null;
};



const authorize = (username, password) => {
    if (environmentProvider.getUsernameEnv() === username &&
        environmentProvider.getUserPasswordEnv() === password) {
        const uniqueString = crypto.randomBytes(64).toString('hex');
        validTokens.push(uniqueString);
        return {status: 200, body: {token: uniqueString}};
    }
    return unauthorizedResponse;
}


module.exports = {authorize,checkAuthorize};