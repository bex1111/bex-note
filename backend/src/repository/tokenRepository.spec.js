const {setToken, getToken, removeToken} = require("./tokenRepository");
const environmentProvider = require('../configProvider');
const path = require("path");
const {promises: fs} = require("fs");

describe('tokenRepository', () => {

    const tempDir = './temp/token';
    const tokenFile = path.join(tempDir, 'token');

    it('set remove and get token', async () => {
        jest.spyOn(environmentProvider, 'getCacheLocation').mockImplementation(() => tempDir);
        let token = 'token'
        await setToken(token);
        await setToken(token);
        await setToken(token + '1');
        expect(getToken()).toEqual([token, token + '1'])
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual('["token","token1"]');
        await removeToken(token);
        expect(getToken()).toEqual([token + '1'])
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual('["token1"]');

    });

});