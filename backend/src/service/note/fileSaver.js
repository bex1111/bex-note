const environmentProvider = require('../../configProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../../validator");
const {createInternalServerErrorResponse, createBadRequestResponse, createOkResponse} = require("../response");


const handle = async (title, content) => {
    validator.validateTitle(title);
    validateContent(content)
    const folderEnv = environmentProvider.getSavingLocation();
    const filePath = path.join(folderEnv, `${title}.md`);

    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await fs.writeFile(filePath, content, 'utf8');

    return createOkResponse();
}

const handleFileSave = async (title, content) => {
    try {
        return await handle(title, content);
    } catch (error) {
        return createInternalServerErrorResponse(error)
    }
};

const validateContent = (content) => {
    if (content === null || content === undefined) {
        throw createBadRequestResponse('Content required');
    }
}

module.exports = {handleFileSave};



