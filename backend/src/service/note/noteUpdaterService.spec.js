const {handleUpdate} = require('./noteUpdaterService');
const fs = require('fs/promises');
const environmentProvider = require('../../configProvider');
const validator = require("./validator");
const path = require("path");


describe('noteUpdaterService', () => {
    const tempDir = './temp/update';

    const oldTestTitle = 'test/old test title';
    const newTestTitle = 'test/new test title';
    const testContent = 'Test content';
    const newTestFilePath = path.join(tempDir, `${newTestTitle}.md`);
    const oldTestFilePath = path.join(tempDir, `${oldTestTitle}.md`);

    beforeEach(async () => {
        jest.clearAllMocks();
        await fs.rm(tempDir, {recursive: true, force: true});
        await fs.mkdir(path.dirname(oldTestFilePath), {recursive: true});
        await fs.writeFile(oldTestFilePath, testContent, 'utf8');
        jest.spyOn(environmentProvider, 'getSavingLocation').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });
        jest.spyOn(validator, 'validateFileExists').mockImplementation(() => {
        });
        jest.spyOn(validator, 'validateFileNotExists').mockImplementation(() => {
        });
        jest.spyOn(validator, 'validateContent').mockImplementation(() => {
        });
    });

    it('calls only update content', async () => {
        const result = await handleUpdate(oldTestTitle, oldTestTitle, testContent);
        expect(result).toEqual({status: 200});

        const fileContent = await fs.readFile(oldTestFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenNthCalledWith(1, oldTestTitle);
        expect(validator.validateTitle).toHaveBeenNthCalledWith(2, oldTestTitle);
        expect(validator.validateFileNotExists).not.toHaveBeenCalledWith(oldTestFilePath);
        expect(validator.validateFileExists).toHaveBeenCalledWith(oldTestFilePath);
        expect(validator.validateContent).toHaveBeenCalledWith(testContent);
    });

    it('calls new title and content', async () => {
        const result = await handleUpdate(newTestTitle, oldTestTitle, testContent);
        expect(result).toEqual({status: 200});

        const fileContent = await fs.readFile(newTestFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenNthCalledWith(1, newTestTitle);
        expect(validator.validateTitle).toHaveBeenNthCalledWith(2, oldTestTitle);
        expect(validator.validateFileNotExists).toHaveBeenCalledWith(newTestFilePath);
        expect(validator.validateFileExists).toHaveBeenCalledWith(oldTestFilePath);
        expect(validator.validateContent).toHaveBeenCalledWith(testContent);
    });

    it('calls two times with correct arguments and returns success', async () => {
        const result1 = await handleUpdate(newTestTitle, oldTestTitle, testContent);
        expect(result1).toEqual({status: 200});

        const fileContent1 = await fs.readFile(newTestFilePath, 'utf-8');
        expect(fileContent1).toBe(testContent);

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenNthCalledWith(1, newTestTitle);
        expect(validator.validateTitle).toHaveBeenNthCalledWith(2, oldTestTitle);
        expect(validator.validateFileNotExists).toHaveBeenCalledWith(newTestFilePath);
        expect(validator.validateFileExists).toHaveBeenCalledWith(oldTestFilePath);
        expect(validator.validateContent).toHaveBeenCalledWith(testContent);

        const result2 = await handleUpdate(oldTestTitle, newTestTitle, testContent + '2');
        expect(result2).toEqual({status: 200});

        const fileContent2 = await fs.readFile(oldTestFilePath, 'utf-8');
        expect(fileContent2).toBe(testContent + '2');

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenNthCalledWith(3, oldTestTitle);
        expect(validator.validateTitle).toHaveBeenNthCalledWith(4, newTestTitle);
        expect(validator.validateFileNotExists).toHaveBeenCalledWith(oldTestFilePath);
        expect(validator.validateFileExists).toHaveBeenCalledWith(newTestFilePath);
        expect(validator.validateContent).toHaveBeenCalledWith(testContent+ '2');
    });
});
