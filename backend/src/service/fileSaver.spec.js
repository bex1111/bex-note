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


    it('calls handleFileSave with correct arguments and returns success', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });

        const testTitle = 'TestFolder/test title';
        const testContent = 'Test content';
        const testFilePath = './temp/TestFolder/test title.md';

        const result = await handleFileSave(testTitle, testContent);
        expect(result).toEqual({body: {message: 'Note saved successfully'}, status: 200});

        const fileContent = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

    it('calls handleFileSave two times with correct arguments and returns success', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });

        const testTitle = 'TestFolder/test title';
        const testContent = 'Test content';
        const testFilePath = './temp/TestFolder/test title.md';

        const result1 = await handleFileSave(testTitle, testContent);
        expect(result1).toEqual({body: {message: 'Note saved successfully'}, status: 200});

        const fileContent1 = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent1).toBe(testContent);

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);

        const result2 = await handleFileSave(testTitle, testContent+'2');
        expect(result2).toEqual({body: {message: 'Note saved successfully'}, status: 200});

        const fileContent2 = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent2).toBe(testContent+'2');

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });
});
