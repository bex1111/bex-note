const environmentProvider = require('./environmentProvider');
const fs = require('fs').promises;
const path = require('path');
const validator = require("./validator");
const handleFileSave = async (title, content) => {

    validator.validateTitle(title);
    const folderEnv = environmentProvider.getFolderEnv();
    const filePath = path.join(folderEnv, `${title}.md`);

    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await fs.writeFile(filePath, content, 'utf8');

    return {body: {message: 'File saved successfully'}, status: 200};

};

module.exports = {handleFileSave};



