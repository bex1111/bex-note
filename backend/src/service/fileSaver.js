const environmentProvider = require('../environmentProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("../validator");
const {createInternalServerErrorResponse} = require("./response");


const handle = async (title, content) => {
    validator.validateTitle(title);
    const folderEnv = environmentProvider.getSavingLocationEnv();
    const filePath = path.join(folderEnv, `${title}.md`);

    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await fs.writeFile(filePath, content, 'utf8');

    return {body: {message: 'File saved successfully'}, status: 200};
}

const handleFileSave = async (title, content) => {
    try {
        return await handle(title, content);
    } catch (error) {
        createInternalServerErrorResponse(error)
    }
};

module.exports = {handleFileSave};



