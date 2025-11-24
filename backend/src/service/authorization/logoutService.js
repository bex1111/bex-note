const tokenRepository = require("../../repository/tokenRepository");
const {createBadRequestResponse, createOkResponse} = require("../response");

const logout = (token) => {
    if (!token || !tokenRepository.getToken().includes(token)) {
        return createBadRequestResponse("Token not exist")
    }
    tokenRepository.removeToken(token)
    return createOkResponse()
}

module.exports = {logout};