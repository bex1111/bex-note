const {handleFileDelete} = require('./fileDelete');
const fs = require('fs/promises');
const environmentProvider = require('../environmentProvider');
const validator = require('../validator');

describe('handleFileDelete', () => {
    const tempDir = './temp';
    const testTitle = 'TestFolder/test title';
    const testFilePath = `${tempDir}/TestFolder/test title.md`;

    beforeEach(async () => {
        try {
            await fs.rm(tempDir, {recursive: true, force: true});
        } catch {
        }
        jest.clearAllMocks();
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });
    });

    afterEach(async () => {
        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

    it('deletes file and returns success', async () => {
        await fs.mkdir(`${tempDir}/TestFolder`, {recursive: true});
        await fs.writeFile(testFilePath, 'Test content', 'utf-8');
        const result = await handleFileDelete(testTitle);
        expect(result).toEqual({body: {message: 'Note deleted successfully'}, status: 200});
    });

    it('deletes only file when two file in a same folder', async () => {
        const testFilePath1 = `${tempDir}/TestFolder/test title1.md`;
        const expectedTestContent1 = 'Test content1';

        await fs.mkdir(`${tempDir}/TestFolder`, {recursive: true});
        await fs.writeFile(testFilePath, 'Test content', 'utf-8');
        await fs.writeFile( testFilePath1, expectedTestContent1, 'utf-8');

        const result = await handleFileDelete(testTitle);
        expect(result).toEqual({body: {message: 'Note deleted successfully'}, status: 200});
        const actualTestFileContent1 = await fs.readFile(testFilePath1, 'utf8');
        expect(actualTestFileContent1).toEqual(expectedTestContent1);

    });

    it('returns 404 if file does not exist', async () => {
        const result = await handleFileDelete(testTitle);
        expect(result).toEqual({body: {error: 'File not found'}, status: 404});
    });
});
