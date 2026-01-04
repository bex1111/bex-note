const {setToken, getToken, removeToken, loadTokens, resetTokens, persistTokens} = require("./tokenRepository");
const environmentProvider = require('../configProvider');
const path = require("path");
const {promises: fs} = require("fs");

describe('tokenRepository', () => {

    const tempDir = './temp/token';
    const tokenFile = path.join(tempDir, 'token');
    const token = 'token'

    beforeEach(async () => {
        resetTokens();
        jest.spyOn(environmentProvider, 'getCacheLocation').mockImplementation(() => tempDir);
        try {
            await fs.rm(tempDir, {recursive: true, force: true});
        } catch {
        }
    });

    it('set remove and get token', async () => {
        setToken(token);
        setToken(token);
        setToken(token + '1');
        expect(getToken()).toEqual([token, token + '1'])
        await persistTokens();
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual(`["${token}","${token + 1}"]`);
        removeToken(token);
        await persistTokens();
        expect(getToken()).toEqual([token + '1'])
        expect(await fs.readFile(tokenFile, 'utf8')).toEqual(`["${token + 1}"]`);
    });

    it('load token and get token', async () => {
        await fs.mkdir(tempDir, {recursive: true});
        await fs.writeFile(tokenFile, `["${token}","${token + 1}"]`, 'utf8');
        await loadTokens();
        expect(getToken()).toEqual([token, token + '1'])
    });

    it('token file not exist, load token return empty set', async () => {
        const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {
        });
        await loadTokens();
        expect(getToken()).toEqual([])
        expect(logSpy).not.toHaveBeenCalled()
    });


});