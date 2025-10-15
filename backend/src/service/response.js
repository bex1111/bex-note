const createInternalServerErrorResponse = (error) => {
    if (error.status && error.body) {
        return error;
    }
    console.log(error)
    return {status: 500, body: {error: 'Internal server error'}};
}

const createFileNotFoundResponse = (error) => {
    if (error.code === 'ENOENT') {
        return {body: {error: 'File not found'}, status: 404};
    }
    return createInternalServerErrorResponse(error)
}

const createBadRequestResponse = (message) => {
    return {status: 400, body: {error: message}};
}


module.exports = { createInternalServerErrorResponse,createFileNotFoundResponse,createBadRequestResponse };
