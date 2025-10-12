const {isAuthorized, authorize, unauthorizedResponse} = require('./auth');
const environmentProvider = require('../environmentProvider');

describe('auth.js integration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const invalidCases = [
        {username: 'wrong', password: 'pass', desc: 'wrong username'},
        {username: 'user', password: 'wrong', desc: 'wrong password'},
        {username: 'wrong', password: 'wrong', desc: 'both wrong'},
    ];

    it.each(invalidCases)('returns unauthorizedResponse if $desc', ({username, password}) => {
        jest.spyOn(environmentProvider, 'getUsernameEnv').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPasswordEnv').mockReturnValue('pass');
        const result = authorize(username, password);
        expect(result).toEqual(unauthorizedResponse);
    });

    it('returns a token if username and password are correct', () => {
        jest.spyOn(environmentProvider, 'getUsernameEnv').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPasswordEnv').mockReturnValue('pass');
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
        expect(environmentProvider.getUserPasswordEnv).toHaveBeenCalledTimes(numberOfTestSet);
        expect(environmentProvider.getUsernameEnv).toHaveBeenCalledTimes(numberOfTestSet);
    });

    it('isAuthorized returns true for a valid token', () => {
        jest.spyOn(environmentProvider, 'getUsernameEnv').mockReturnValue('user');
        jest.spyOn(environmentProvider, 'getUserPasswordEnv').mockReturnValue('pass');
        const {body: {token}} = authorize('user', 'pass');
        expect(isAuthorized(token)).toBe(true);
    });

    it('isAuthorized returns false for an invalid token', () => {
        expect(isAuthorized('not-a-token')).toBe(false);
    });
});
