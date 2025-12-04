const {validateTitle, validateFileNotExists, validateFileExists, validateContent} = require('./validator');
const path = require("path");
const fs = require('fs').promises;

describe('validator', () => {

    describe('validateTitle', () => {

        it.each([
            ['null', null],
            ['undefined', undefined],
            ['empty', '']
        ])('content validation with %s title should return error', (description, invalidTitle) => {
            try {
                validateTitle(invalidTitle)
            } catch (error) {
                expect(error).toEqual({
                    body: {error: 'Title required!'},
                    status: 400
                })
            }
        });


        it('does not throw if title is a non-empty string', () => {
            expect(() => validateTitle('myTitle')).not.toThrow();
        });
    });

    describe('validateContent', () => {

        it.each([
            ['null', null],
            ['undefined', undefined],
            ['empty', ''],
            ['spaces', ' ']
        ])('content validation with %s content should return error', (description, invalidContent) => {
            try {
                validateContent(invalidContent)
            } catch (error) {
                expect(error).toEqual({
                    body: {error: 'Content required!'},
                    status: 400
                })
            }
        });

        it('does not throw if content is a non-empty string', () => {
            expect(() => validateContent('some content')).not.toThrow();
        });
    });

    describe('validateFileExists', () => {
        const testFilePath = './temp/validator/test-file-exists.md';

        it('should not throw when file does not exist', async () => {
            await expect(validateFileNotExists(testFilePath)).resolves.toBeUndefined();
        });

        it('should throw error when file already exists', async () => {
            const fs = require('fs').promises;
            await fs.mkdir(path.dirname(testFilePath), {recursive: true});
            await fs.writeFile(testFilePath, '');

            try {
                await validateFileNotExists(testFilePath);
                fail('Expected error to be thrown');
            } catch (error) {
                expect(error).toEqual({
                    body: {error: 'Note with the same title already exists!'},
                    status: 400
                });
            } finally {
                await fs.rm(testFilePath);
            }
        });
    });


    describe('validateNotFileExists', () => {
        const testFilePath = './temp/validator/test-file-not-exists.md';

        it('should not throw when file exists', async () => {

            await fs.mkdir(path.dirname(testFilePath), {recursive: true});
            await fs.writeFile(testFilePath, '');

            try {
                await expect(validateFileExists(testFilePath)).resolves.toBeUndefined();
            } finally {
                await fs.rm(testFilePath);
            }
        });

        it('should throw error when file does not exist', async () => {
            try {
                await validateFileExists(testFilePath);
                fail('Expected error to be thrown');
            } catch (error) {
                expect(error).toEqual({
                    body: {error: 'Note does not exist!'},
                    status: 400
                });
            }
        });
    });
});