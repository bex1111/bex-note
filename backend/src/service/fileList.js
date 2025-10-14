const fs = require('fs').promises;
const environmentProvider = require('../environmentProvider');
const path = require('path');
const {createInternalServerErrorResponse} = require("./response");

const removeTheFistSlashOrDotSlash = (text) => {
    return text.replace(/^\.?\//, '');
}

const createFileNameList = (files) => {
    const savingLocation = removeTheFistSlashOrDotSlash(environmentProvider.getSavingLocationEnv());
    return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace(savingLocation, ''))
        .map(file => removeTheFistSlashOrDotSlash(file))
        .map(file => file.replace(/\.md$/, ''))
        .sort()
        .map(file => ({filename: file}))
}


const handleError = (error) => {
    if (error.code === 'ENOENT') {
        return {status: 200, body: []};
    }
    return createInternalServerErrorResponse(error)
}

const createResponse = (files) => {
    return {
        status: 200,
        body: createFileNameList(files)
    };
}

const handleFileList = async () => {
    try {
        const files = await getAllFilesRecursive(environmentProvider.getSavingLocationEnv());
        return createResponse(files);
    } catch (err) {
        return handleError(err);
    }
}

const getAllFilesRecursive = async (directory) => {
    let files = [];
    const filesInACurrentFolder = await fs.readdir(directory, {withFileTypes: true});
    for (const file of filesInACurrentFolder) {
        const fileFullPath = path.join(directory, file.name);
        if (file.isDirectory()) {
            files = files.concat(await getAllFilesRecursive(fileFullPath));
        } else {
            files.push(fileFullPath);
        }
    }
    return files;
};

module.exports = {handleFileList};
