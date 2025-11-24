const environmentProvider = require('../../configProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../../validator");
const { createFileNotFoundResponse} = require("../response");


const handle = async (title) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getSavingLocation();
    const filePath = path.join(folderEnv, `${title}.md`);

    await fs.unlink(filePath);
    return { status: 200};
}

const handleFileDelete = async (title) => {
    try {
        return await handle(title);
    } catch (error) {
        return createFileNotFoundResponse(error);
    }
};

module.exports = {handleFileDelete};

