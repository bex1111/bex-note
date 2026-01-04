const express = require('express')

const app = express()

const environmentProvider = require('./configProvider');
const {checkAuthorize} = require('./middleware/auth');
const {getPort, getMaxFileSize} = require("./configProvider");

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

module.exports = app;

require('./controller/noteController');
require('./controller/authorizationController');
require('./controller/healthController');
const {handleInit} = require("./service/initService");
const {handleShutdown} = require("./service/shutdownService");


app.listen(getPort(), handleInit);

process.on('SIGTERM', handleShutdown);

process.on('SIGINT', handleShutdown);