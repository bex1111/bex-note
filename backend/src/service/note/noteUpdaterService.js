const environmentProvider = require('../../configProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("./validator");
const {unboxErrorOrCreateInternalServerError, createOkResponse} = require("../response");


const handle = async (newTitle, oldTitle, content) => {
    validator.validateTitle(newTitle);
    validator.validateTitle(oldTitle)
    validator.validateContent(content)
    const newFilepath = createFilePath(newTitle);
    const oldFilepath = createFilePath(oldTitle);

    await validator.validateFileExists(oldFilepath);
    await validator.validateFileNotExists(newFilepath)


    await fs.mkdir(path.dirname(newFilepath), {recursive: true});
    await fs.writeFile(newFilepath, content, 'utf8');
    if (newTitle !== oldTitle) {
        await fs.unlink(oldFilepath);
    }

    return createOkResponse();
}

const handleUpdate = async (newTitle, oldTitle, content) => {
    try {
        return await handle(newTitle, oldTitle, content);
    } catch (error) {
        return unboxErrorOrCreateInternalServerError(error)
    }
};


const createFilePath = (title) => {
    const folderEnv = environmentProvider.getSavingLocation();
    return path.join(folderEnv, `${title}.md`);
}

module.exports = {handleUpdate};
