const internalServerError = (error) => {
    console.log(error)
    return {status: 500, body: {error: 'Internal server error'}};
}


module.exports = { internalServerError };
