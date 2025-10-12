const getSavingLocationEnv = () => {
  return process.env.FOLDER || '';
};

const getStaticFileForWebEnv = () => {
    return process.env.STATIC_FOLDER_FOR_WEB || '';
};

module.exports = { getFolderEnv: getSavingLocationEnv };