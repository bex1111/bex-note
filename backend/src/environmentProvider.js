const getFolderEnv = () => {
  return process.env.FOLDER || '';
};

module.exports = { getFolderEnv };