const tokenRepository = require("../../repository/tokenRepository");
const environmentProvider = require("../../configProvider");
const {authorize} = require("./authorizeService");

describe('authorizeService', () => {
    const unauthorizedResponse = {status: 403, body: {error: 'Unauthorized'}};
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authorize', () => {

        const invalidCases = [
            {username: 'wrong', password: 'pass', desc: 'wrong username'},
            {username: 'user', password: 'wrong', desc: 'wrong password'},
            {username: 'wrong', password: 'wrong', desc: 'both wrong'},
        ];

        beforeEach(() => {
            jest.spyOn(environmentProvider, 'getUsername').mockReturnValue('user');
            jest.spyOn(environmentProvider, 'getUserPassword').mockReturnValue('pass');
            jest.spyOn(tokenRepository, 'setToken').mockImplementation(() => {
            });
        });

        it.each(invalidCases)('returns unauthorizedResponse if $desc', async ({username, password}) => {
            const result = await authorize(username, password);
            expect(result).toEqual(unauthorizedResponse);
            expect(tokenRepository.setToken).not.toHaveBeenCalled();
        });

        it('returns a token if username and password are correct', async () => {
            const tokens = []
            const numberOfTestSet = 10_000;
            for (let i = 0; i < numberOfTestSet; i++) {
                tokens.push(await authorize('user', 'pass'));
            }
            expect(new Set(tokens.map(t => t.body.token)).size).toBe(numberOfTestSet)
            tokens.forEach(token => {
                expect(token.status).toBe(200);
                expect(token.body.token).toMatch(/^[a-f0-9]{256}$/);
            })
            expect(environmentProvider.getUserPassword).toHaveBeenCalledTimes(numberOfTestSet);
            expect(environmentProvider.getUsername).toHaveBeenCalledTimes(numberOfTestSet);
            expect(tokenRepository.setToken).toHaveBeenCalledTimes(numberOfTestSet);
        });
    });
});