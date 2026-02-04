const fs = require('fs').promises;
const environmentProvider = require('../../configProvider');
const path = require('path');
const { unboxErrorOrCreateInternalServerError, createOkResponseWithBody } = require('../response');

const compareFiles = (file1, file2) => {
    const file1Depth = file1.split(path.sep).length;
    const file2Depth = file2.split(path.sep).length;
    if (file1Depth !== file2Depth) {
        return file1Depth - file2Depth;
    }
    return file1.toLowerCase().localeCompare(file2.toLowerCase());
};

const createFileNameList = (files) => {
    return files
        .filter(file => file.includes('.md'))
        .map(file => finalNameGenerator(file))
        .sort(compareFiles)
        .map(file => ({ title: file }));
};

const finalNameGenerator = (name) => {
    let savingLocation = name.replace(path.normalize(environmentProvider.getSavingLocation()), '');
    let withoutExtension = savingLocation.replace('.md', '');
    let parsedPath = withoutExtension.split(path.sep).filter(x => x !== '');
    return parsedPath.length > 1 ? parsedPath.join(path.sep) : parsedPath[0];

};

const handleError = (error) => {
    if (error.code === 'ENOENT') {
        return createOkResponseWithBody([]);
    }
    return unboxErrorOrCreateInternalServerError(error);
};

const handleFileList = async () => {
    try {
        const files = await getAllFilesRecursive(environmentProvider.getSavingLocation());
        return createOkResponseWithBody(createFileNameList(files));
    } catch (err) {
        return handleError(err);
    }
};

const getAllFilesRecursive = async (directory) => {
    let files = [];
    const filesInACurrentFolder = await fs.readdir(directory, { withFileTypes: true });
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

module.exports = { handleFileList };
