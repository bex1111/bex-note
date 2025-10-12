const environmentProvider = require('./environmentProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("./validator");


const handleError = (err) => {
    if (err.code === 'ENOENT') {
        return {body: {error: 'File not found'}, status: 404};
    }
    throw err;
}

const handleFileDelete = async (title) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getFolderEnv();
    const filePath = path.join(folderEnv, `${title}.md`);
    try {
        await fs.unlink(filePath);
        return {body: {message: 'File deleted successfully'}, status: 200};
    } catch (err) {
        return handleError(err);
    }
};

module.exports = {handleFileDelete};

