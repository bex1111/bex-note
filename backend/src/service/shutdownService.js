const tokenRepository = require("../repository/tokenRepository");

const handleShutdown = async () => {
    await tokenRepository.persistTokens();
    console.log('Server shutting down...');
};

module.exports = { handleShutdown };
