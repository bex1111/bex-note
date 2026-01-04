const configProvider = require("../configProvider");
const tokenRepository = require("../repository/tokenRepository");

const handleInit = async () => {
    await tokenRepository.loadTokens()
    console.log(`Bex-note started ${configProvider.getPort()}`)
}

module.exports = { handleInit };
