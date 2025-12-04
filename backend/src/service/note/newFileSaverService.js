const environmentProvider = require('../../configProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("./validator");
const {unboxErrorOrCreateInternalServerError, createOkResponse} = require("../response");


const handle = async (title, content) => {
    validator.validateTitle(title);
    validator.validateContent(content)

    const folderEnv = environmentProvider.getSavingLocation();
    const filePath = path.join(folderEnv, `${title}.md`);
    await validator.validateFileNotExists(filePath)

    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await fs.writeFile(filePath, content, 'utf8');

    return createOkResponse();
}

const handleSave = async (title, content) => {
    try {
        return await handle(title, content);
    } catch (error) {
        return unboxErrorOrCreateInternalServerError(error)
    }
};


module.exports = {handleSave};
