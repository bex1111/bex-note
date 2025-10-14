const environmentProvider = require('../environmentProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../validator");
const {internalServerError} = require("./response");

const handleFileContent = async (title) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getSavingLocationEnv();
    const filePath = path.join(folderEnv, `${title}.md`);
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return { body: { content }, status: 200 };
    } catch (err) {
        if (err.code === 'ENOENT') {
            return { body: { message: 'File not found' }, status: 404 };
        }
        return internalServerError(err);
    }
};

module.exports = { handleFileContent };

