const getSavingLocation = () => {
    if (!process.env.FOLDER) {
        console.error(generateEnvironmentNotSetText('FOLDER'));
    }
    return process.env.FOLDER;
};

const getStaticFileForWeb = () => {
    if (!process.env.STATIC_FOLDER_FOR_WEB) {
        console.error(generateEnvironmentNotSetText('STATIC_FOLDER_FOR_WEB'));
    }
    return process.env.STATIC_FOLDER_FOR_WEB;
};

const getUsername = () => {
    if (!process.env.USERNAME) {
        console.error(generateEnvironmentNotSetText('USERNAME'));
    }
    return process.env.USERNAME;
}

const getUserPassword = () => {
    if (!process.env.PASSWORD) {
        console.error(generateEnvironmentNotSetText('PASSWORD'));
    }
    return process.env.PASSWORD;
}

const getPort = () => {
    if (!process.env.PORT) {
        console.log(`${generateEnvironmentNotSetText('PORT')} Use default 3000.`);
        return 3000;
    }
    return process.env.PORT ;
}

const generateEnvironmentNotSetText=(environmentName)=>{
    return `${environmentName} environment variable is not set.`;
}

module.exports = {
    getSavingLocation,
    getStaticFileForWeb,
    getUsername,
    getUserPassword,
    getPort
};
