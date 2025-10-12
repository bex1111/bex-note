const getSavingLocationEnv = () => {
    return process.env.FOLDER || '';
};

const getStaticFileForWebEnv = () => {
    return process.env.STATIC_FOLDER_FOR_WEB || '';
};

const getUsernameEnv = () => {
    return process.env.USERNAME || '';
}

const getUserPasswordEnv = () => {
    return process.env.PASSWORD || '';
}

module.exports = {getSavingLocationEnv, getStaticFileForWebEnv, getUsernameEnv, getUserPasswordEnv};