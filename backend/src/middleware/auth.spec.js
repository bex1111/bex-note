const {authorize, checkAuthorize} = require('./auth');
const environmentProvider = require('../configProvider');

describe('auth.js integration', () => {
    const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const invalidCases = [
        {username: 'wrong', password: 'pass', desc: 'wrong username'},
        {username: 'user', password: 'wrong', desc: 'wrong password'},
        {username: 'wrong', password: 'wrong', desc: 'both wrong'},
    ];

    it.each(invalidCases)('returns unauthorizedResponse if $desc', ({username, password}) => {
        jest.spyOn(environmentProvider, 'getUsername').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPassword').mockReturnValue('pass');
        const result = authorize(username, password);
        expect(result).toEqual(unauthorizedResponse);
    });

    it('returns a token if username and password are correct', () => {
        jest.spyOn(environmentProvider, 'getUsername').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPassword').mockReturnValue('pass');
        const tokens = []
        const numberOfTestSet = 10_000;
        for (let i = 0; i < numberOfTestSet; i++) {
            tokens.push(authorize('user', 'pass'));
        }
        expect(new Set(tokens.map(t => t.body.token)).size).toBe(numberOfTestSet)
        tokens.forEach(token => {
            expect(token.status).toBe(200);
            expect(token.body.token).toMatch(/^[a-f0-9]{128}$/);
        })
        expect(environmentProvider.getUserPassword).toHaveBeenCalledTimes(numberOfTestSet);
        expect(environmentProvider.getUsername).toHaveBeenCalledTimes(numberOfTestSet);
    });

    it('checkAuthorize returns null for a valid token', () => {
        jest.spyOn(environmentProvider, 'getUsername').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPassword').mockReturnValue('pass');
        const {body: {token}} = authorize('user', 'pass');
        expect(checkAuthorize(token)).toBeNull();
    });

    it('checkAuthorize returns with response for an invalid token', () => {
        expect(checkAuthorize('not-a-token')).toEqual(unauthorizedResponse);
    });
});
