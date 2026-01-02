const crypto = require('crypto');
const {createUnauthorizedResponse} = require("../response");
const environmentProvider = require("../../configProvider");
const tokenRepository = require("../../repository/tokenRepository");


const authorize = async (username, password) => {
    if (environmentProvider.getUsername() === username &&
        environmentProvider.getUserPassword() === password) {
        const uniqueString = crypto.randomBytes(128).toString('hex');
        await tokenRepository.setToken(uniqueString);
        return {status: 200, body: {token: uniqueString}};
    }
    return createUnauthorizedResponse();
}

module.exports = {authorize};