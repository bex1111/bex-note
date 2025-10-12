const validateTitle = (title) => {
    if (!title) {
        throw {body: {error: 'Title required'}, status: 400};
    }
};

module.exports = {validateTitle};