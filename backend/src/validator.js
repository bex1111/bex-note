const {createBadRequestResponse} = require("./service/note/response");

const validateTitle = (title) => {
    if (!title) {
        throw createBadRequestResponse('Title required');
    }
};

module.exports = {validateTitle};