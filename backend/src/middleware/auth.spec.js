const { checkAuthorize} = require('./auth');
const environmentProvider = require('../configProvider');
const tokenRepository = require("../repository/tokenRepository");

describe('auth', () => {
    const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('checkAuthorize', () => {
        const validToken = 'valid-token';

        beforeEach(() => {
            jest.spyOn(tokenRepository, 'getToken').mockImplementation(() => [validToken]);
        });

        it('returns null for a valid token', () => {
            jest.spyOn(environmentProvider, 'getUsername').mockReturnValue('user');
            jest.spyOn(environmentProvider, 'getUserPassword').mockReturnValue('pass');
            expect(checkAuthorize(validToken)).toBeNull();
        });

        it('returns with response for an invalid token', () => {
            expect(checkAuthorize('not-a-token')).toEqual(unauthorizedResponse);
        });

        it('returns with response for an empty token', () => {
            expect(checkAuthorize()).toEqual(unauthorizedResponse);
        });
    });
});
