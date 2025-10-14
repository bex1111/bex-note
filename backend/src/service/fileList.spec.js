const {handleFileList} = require('./fileList');
const fs = require('fs/promises');
const path = require('path');
const environmentProvider = require('../environmentProvider');

describe('handleFileList (integration)', () => {
    const tempDir = './temp'
    beforeEach(async () => {
        try {
            await fs.rm(tempDir, {recursive: true, force: true});
        } catch {
        }
        jest.clearAllMocks();
        jest.spyOn(environmentProvider, 'getSavingLocationEnv').mockImplementation(() => './temp');
    });

    it('returns a list of .md files without extension', async () => {
        await fs.mkdir(path.join(tempDir, 'test/test2'), {recursive: true});
        await fs.writeFile(path.join(tempDir, 'test/note1.md'), '');
        await fs.writeFile(path.join(tempDir, 'note2.md'), '');
        await fs.writeFile(path.join(tempDir, 'test/notMarkdown.txt'), '');
        await fs.writeFile(path.join(tempDir, 'test/test2/README.md'), '');

        const result = await handleFileList();
        expect(result).toEqual({
            status: 200,
            body: [
                { title: 'note2' },
                { title: 'test/note1' },
                { title: 'test/test2/README' }
            ]
        });
        expect(environmentProvider.getSavingLocationEnv).toHaveBeenCalled();
    });

    it('returns an empty list if folder does not exist (ENOENT)', async () => {
        const result = await handleFileList();
        expect(result).toEqual({status: 200, body: []});
    });
});
