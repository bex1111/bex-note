const {createBadRequestResponse} = require("../response");
const {promises: fs} = require("fs");

const validateTitle = (title) => {
    if (!title) {
        throw createBadRequestResponse('Title required!');
    }
};

const validateFileNotExists = async (filePath) => {
    try {
        await fs.access(filePath);
    } catch (err) {
        return;
    }
    throw createBadRequestResponse('Note with the same title already exists!');

};

const validateFileExists = async (filePath) => {
    try {
        await fs.access(filePath);
    } catch (err) {
        throw createBadRequestResponse('Note does not exist!');
    }
};

const validateContent = (content) => {
    if (content === null || content === undefined || content.trim() === '') {
        throw createBadRequestResponse('Content required!');
    }
}


module.exports = {validateTitle, validateFileNotExists, validateFileExists, validateContent};