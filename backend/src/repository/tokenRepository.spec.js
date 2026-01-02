const {setToken, getToken, removeToken, loadTokens} = require("./tokenRepository");
const environmentProvider = require('../configProvider');
const path = require("path");
const {promises: fs} = require("fs");

describe('tokenRepository', () => {

    const tempDir = './temp/token';
    const tokenFile = path.join(tempDir, 'token');
    const token = 'token'

    it('set remove and get token', async () => {
        jest.spyOn(environmentProvider, 'getCacheLocation').mockImplementation(() => tempDir);

        await setToken(token);
        await setToken(token);
        await setToken(token + '1');
        expect(getToken()).toEqual([token, token + '1'])
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual(`["${token}","${token + 1}"]`);
        await removeToken(token);
        expect(getToken()).toEqual([token + '1'])
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual(`["${token + 1}"]`);
    });

    it('load token and get token', async () => {
        jest.spyOn(environmentProvider, 'getCacheLocation').mockImplementation(() => tempDir);
        await fs.mkdir(tempDir, {recursive: true});
        await fs.writeFile(tokenFile, `["${token}","${token + 1}"]`, 'utf8');
        await loadTokens();
        expect(getToken()).toEqual([ token + '1',token])
    });


});