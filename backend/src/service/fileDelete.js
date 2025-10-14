const environmentProvider = require('../environmentProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../validator");
const {createInternalServerErrorResponse, createFileNotFoundResponse} = require("./response");


const handle = async (title) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getSavingLocationEnv();
    const filePath = path.join(folderEnv, `${title}.md`);

    await fs.unlink(filePath);
    return {body: {message: 'Note deleted successfully'}, status: 200};
}

const handleFileDelete = async (title) => {
    try {
        return await handle(title);
    } catch (error) {
        return createFileNotFoundResponse(error);
    }
};

module.exports = {handleFileDelete};

