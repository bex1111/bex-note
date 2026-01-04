const {handleShutdown} = require('./shutdownService');
const tokenRepository = require('../repository/tokenRepository');

describe('shutdownService', () => {

    it('calls tokenRepository.persistTokens and logs a message', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {
        });
        const persistTokenSpy = jest.spyOn(tokenRepository, 'persistTokens').mockImplementation(() => {
        });

        await handleShutdown();

        expect(persistTokenSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith('Server shutting down...');
    });
});

