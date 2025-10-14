const createInternalServerErrorResponse = (error) => {
    console.log(error)
    return {status: 500, body: {error: 'Internal server error'}};
}

const createFileNotFoundResponse = (error) => {
    if (error.code === 'ENOENT') {
        return {body: {error: 'File not found'}, status: 404};
    }
    return createInternalServerErrorResponse(error)
}


module.exports = { createInternalServerErrorResponse,createFileNotFoundResponse };
