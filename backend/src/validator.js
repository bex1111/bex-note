const {createBadRequestResponse} = require("./service/response");

const validateTitle = (title) => {
    if (!title) {
        throw createBadRequestResponse('Title required');
    }
};

module.exports = {validateTitle};