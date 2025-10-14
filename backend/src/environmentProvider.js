const getSavingLocationEnv = () => {
    return process.env.FOLDER;
};

const getStaticFileForWebEnv = () => {
    return process.env.STATIC_FOLDER_FOR_WEB;
};

const getUsernameEnv = () => {
    return process.env.USERNAME;
}

const getUserPasswordEnv = () => {
    return process.env.PASSWORD;
}

const validateAllEnvSet = () => {
    [getSavingLocationEnv(), getStaticFileForWebEnv(), getUsernameEnv(), getUserPasswordEnv()]
        .forEach((env) => {
            if (!env) {
                console.error("Not all required environment variables are set.");
            }
        });
}

module.exports = {getSavingLocationEnv, getStaticFileForWebEnv, getUsernameEnv, getUserPasswordEnv, validateAllEnvSet};
