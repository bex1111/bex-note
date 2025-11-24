const environmentProvider = require('../../configProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../../validator");
const { createFileNotFoundResponse} = require("./response");

const handle = async (title) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getSavingLocation();
    const filePath = path.join(folderEnv, `${title}.md`);

    const content = await fs.readFile(filePath, 'utf8');
    return {body: {content}, status: 200};
}

const handleFileContent = async (title) => {
    try {
        return await handle(title);
    } catch (error) {
        return createFileNotFoundResponse(error)
    }
};

module.exports = {handleFileContent};