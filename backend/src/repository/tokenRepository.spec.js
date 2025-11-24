const {setToken, getToken, removeToken} = require("./tokenRepository");

describe('tokenRepository', () => {


    it('set remove and get token', () => {
        let token='token'
        setToken(token);
        setToken(token);
        setToken(token+'1');
        expect(getToken()).toEqual([token,token+'1'])
        removeToken(token);
        expect(getToken()).toEqual([token+'1'])
    });

});