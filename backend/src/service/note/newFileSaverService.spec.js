const {handleSave} = require('./newFileSaverService');
const fs = require('fs/promises');
const environmentProvider = require('../../configProvider');
const validator = require("./validator");


describe('newFileSaverService', () => {
    const tempDir = './temp/save';

    const testTitle = 'test/test title';
    const testContent = 'Test content';
    const testFilePath = `${tempDir}/test/test title.md`;

    beforeEach(async () => {
        jest.clearAllMocks();
        try {
            await fs.rm(tempDir, {recursive: true, force: true});
        } catch {
        }
        jest.spyOn(environmentProvider, 'getSavingLocation').mockImplementation(() => tempDir);
        jest.spyOn(validator, 'validateTitle').mockImplementation(() => {
        });
    });


    it('calls handleFileSave with correct arguments and returns success', async () => {
        const result = await handleSave(testTitle, testContent);
        expect(result).toEqual({status: 200});

        const fileContent = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent).toBe(testContent);

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

    it('calls handleFileSave two times with correct arguments and returns file already exist', async () => {
        const result1 = await handleSave(testTitle, testContent);
        expect(result1).toEqual({status: 200});

        const fileContent1 = await fs.readFile(testFilePath, 'utf-8');
        expect(fileContent1).toBe(testContent);

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);

        const result2 = await handleSave(testTitle, testContent + '2');
        expect(result2).toEqual({body: {error: 'Note with the same title already exists!'}, status: 400});

        expect(environmentProvider.getSavingLocation).toHaveBeenCalled();
        expect(validator.validateTitle).toHaveBeenCalledWith(testTitle);
    });

});
