const tokenRepository = require("../../repository/tokenRepository");
const {logout} = require("./logoutService");

describe('logoutService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(tokenRepository, 'getToken').mockReturnValue(['token1', 'token2']);
        jest.spyOn(tokenRepository, 'removeToken').mockImplementation(() => {
        });
    });

    it('returns bad request if token does not exist', async () => {
        const result = logout('not-present');
        expect(result).toEqual({status: 400, body: {error: 'Token not exist'}});
        expect(tokenRepository.getToken).toHaveBeenCalledTimes(1);
        expect(tokenRepository.removeToken).not.toHaveBeenCalled();
    });

    it('returns bad request if input token empty', async () => {
        const result = logout();
        expect(result).toEqual({status: 400, body: {error: 'Token not exist'}});
        expect(tokenRepository.getToken).not.toHaveBeenCalled();
        expect(tokenRepository.removeToken).not.toHaveBeenCalled();
    });


    it('removes token and returns ok if token exists', async () => {

        const result = logout('token1');
        expect(tokenRepository.removeToken).toHaveBeenCalledWith('token1');
        expect(result).toEqual({status: 200});
    });
});
