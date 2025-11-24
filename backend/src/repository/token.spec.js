const {setToken, getToken} = require("./token");

describe('token js int test', () => {

    it('set and get token', () => {
        let token='token'
        setToken(token);
        setToken(token);
        setToken(token+'1');
        expect(getToken()).toEqual([token,token+'1'])
    });

});