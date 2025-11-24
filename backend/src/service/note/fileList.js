const fs = require('fs').promises;
const environmentProvider = require('../../configProvider');
const path = require('path');
const {createInternalServerErrorResponse} = require("./response");

const createFileNameList = (files) => {
    return files
        .filter(file => file.includes('.md'))
        .map(file => finalNameGenerator(file))
        .sort()
        .map(file => ({title: file}))
}

const finalNameGenerator = (name) => {
    let savingLocation = name.replace(path.normalize(environmentProvider.getSavingLocation()), '')
    let withoutExtension = savingLocation.replace('.md', '');
    let parsedPath = withoutExtension.split(path.sep);
    return parsedPath.length > 2 ? parsedPath.join(path.sep) : parsedPath[1];
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
        const files = await getAllFilesRecursive(environmentProvider.getSavingLocation());
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
