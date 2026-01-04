const { handleInit } = require('./initService');

const configProvider = require('../configProvider');
const tokenRepository = require('../repository/tokenRepository');

describe('initService.handleInit', () => {
  it('loads tokens and logs startup with port', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const getPortSpy = jest.spyOn(configProvider, 'getPort').mockImplementation(() => "test-port");
    const loadTokenSpy = jest.spyOn(tokenRepository, 'loadTokens').mockImplementation(() => {});

    await handleInit();

    expect(loadTokenSpy).toHaveBeenCalledTimes(1);
    expect(getPortSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Bex-note started test-port');
  });

});
