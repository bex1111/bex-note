const crypto = require('crypto');
const environmentProvider = require('../environmentProvider');

let validTokens = [];

const isAuthorized = (token) => {
    return validTokens.includes(token);
};

const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};


const authorize = (username, password) => {
    if (environmentProvider.getUsernameEnv() === username &&
        environmentProvider.getUserPasswordEnv() === password) {
        const uniqueString = crypto.randomBytes(64).toString('hex');
        validTokens.push(uniqueString);
        return {status: 200, body: {token: uniqueString}};
    }
    return unauthorizedResponse;
}


module.exports = {isAuthorized, authorize, unauthorizedResponse};

