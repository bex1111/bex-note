const express = require('express')
const {handleInit} = require("./service/initService");
const {handleShutdown} = require("./service/shutdownService");
const environmentProvider = require('./configProvider');
const {checkAuthorize} = require('./middleware/auth');
const {getPort, getMaxFileSize} = require("./configProvider");
const {useNoteController} = require("./controller/noteController");
const {useAuthorizationController} = require("./controller/authorizationController");
const {useHealthController} = require("./controller/healthController");


const app = express()

app.use(express.json({limit: getMaxFileSize()}));
app.use(express.urlencoded({limit: getMaxFileSize()}));
app.use(express.static(environmentProvider.getStaticFileForWeb()));

app.use('/api/internal', (req, res, next) => {
    const response = checkAuthorize(req.headers['x-auth-token']);
    if (response) {
        return res.status(response.status)
            .json(response.body);
    }
    next();
});

useNoteController(app);
useAuthorizationController(app);
useHealthController(app);

const server = app.listen(getPort(), handleInit);

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

module.exports = {app, server};
