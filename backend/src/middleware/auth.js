const tokenRepository = require("../repository/tokenRepository");

const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};

const checkAuthorize = (token) => {
    if (!token || !tokenRepository.getToken().includes(token)) {
        return unauthorizedResponse;
    }
    return null;
};


module.exports = {checkAuthorize};