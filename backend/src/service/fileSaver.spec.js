const {handleFileSave} = require('./fileSaver');
const fs = require('fs/promises');
const environmentProvider = require('../environmentProvider');
const validator = require("../validator");


describe('handleFileSave', () => {
    const tempDir = './temp';

    const testTitle = 'save/test title';
    const testContent = 'Test content';
    const testFilePath = './temp/save/test title.md';

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

        const result = await handleFileSave(testTitle, testContent);
        expect(result).toEqual({ status: 200});

        const fileContent = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

    it('calls handleFileSave two times with correct arguments and returns success', async () => {
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });

        const result1 = await handleFileSave(testTitle, testContent);
        expect(result1).toEqual({ status: 200});

        const fileContent1 = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent1).toBe(testContent);

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);

        const result2 = await handleFileSave(testTitle, testContent+'2');
        expect(result2).toEqual({ status: 200});

        const fileContent2 = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent2).toBe(testContent+'2');

        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });
});
