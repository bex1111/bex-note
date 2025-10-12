const {handleFileSave} = require('./fileSaver');
const fs = require('fs/promises');
const environmentProvider = require('../environmentProvider');
const validator = require("../validator");


describe('handleFileSave', () => {
    const tempDir = './temp';
    beforeEach(async () => {
        jest.clearAllMocks();
        try {
            await fs.rm(tempDir, {recursive: true, force: true});
        } catch {
        }
    });


    it('calls writeFile with correct arguments and returns success', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });

        const testTitle = 'TestFolder/test title';
        const testContent = 'Test content';
        const testFilePath = './temp/TestFolder/test title.md';

        const result = await handleFileSave(testTitle, testContent);
        expect(result).toEqual({body: {message: 'File saved successfully'}, status: 200});

        const fileContent = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });
});
