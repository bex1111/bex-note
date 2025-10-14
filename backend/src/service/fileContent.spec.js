const { handleFileContent } = require('./fileContent');
const { handleFileSave } = require('./fileSaver');
const fs = require('fs/promises');
const environmentProvider = require('../environmentProvider');
const validator = require("../validator");

describe('handleFileContent', () => {
    const tempDir = './temp';
    beforeEach(async () => {
        jest.clearAllMocks();
        try {
            await fs.rm(tempDir, { recursive: true, force: true });
        } catch {}
    });

    it('returns file content for an existing file', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {});

        const testTitle = 'TestFolder/test title';
        const testContent = 'Test content for reading';
        await handleFileSave(testTitle, testContent);

        const result = await handleFileContent(testTitle);
        expect(result).toEqual({ body: { content: testContent }, status: 200 });
        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

    it('returns 404 if file does not exist', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {});

        const result = await handleFileContent('NonExistentFile');
        expect(result).toEqual({ body: { error: 'File not found' }, status: 404 });
    });
});

