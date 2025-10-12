const {handleFileDelete} = require('./fileDelete');
const fs = require('fs/promises');
const environmentProvider = require('./environmentProvider');
const validator = require('./validator');

// Use a temp directory for tests
describe('handleFileDelete', () => {
    const tempDir = './temp';
    const testTitle = 'TestFolder/test title';
    const testFilePath = `${tempDir}/TestFolder/test title.md`;

    beforeAll(async () => {
        jest.spyOn(environmentProvider, 'getFolderEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });
    });

    afterEach(async () => {
        expect(environmentProvider.getFolderEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
        jest.clearAllMocks();
        try {
            await fs.unlink(testFilePath);
        } catch {
        }
    });

    it('deletes file and returns success', async () => {
        await fs.mkdir(`${tempDir}/TestFolder`, {recursive: true});
        await fs.writeFile(testFilePath, 'Test content', 'utf-8');
        const result = await handleFileDelete(testTitle);
        expect(result).toEqual({body: {message: 'File deleted successfully'}, status: 200});
    });

    it('returns 404 if file does not exist', async () => {
        const result = await handleFileDelete(testTitle);
        expect(result).toEqual({body: {error: 'File not found'}, status: 404});
    });
});
