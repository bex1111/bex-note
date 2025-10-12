const {handleFileSave} = require('./service/fileSaver');
const {handleFileDelete} = require('./service/fileDelete');
const {handleFileList} = require('./service/fileList');
const express = require('express')
const app = express()
const port = 3000
const environmentProvider = require('./environmentProvider');
const {isAuthorized, unauthorizedResponse} = require('./middleware/auth');

const internalServerError = (res, error) => {
    console.log(error)
    res.status(500).json({error: 'Internal server error'});
}

app.use(express.json());
app.use(express.static(environmentProvider.getStaticFileForWebEnv()));

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token || !isAuthorized(token)) {
        return res.status(unauthorizedResponse.status)
            .json(unauthorizedResponse.body);
    }
    next();
}

app.use('/api/internal/', authMiddleware);

app.use('/api/internal/save', async (req, res) => {
    try {
        const {title, content} = req.body;
        const result = await handleFileSave(title, content);
        res.status(result.status).json(result.body);
    } catch (error) {
        if (error && error.status && error.body) {
            res.status(error.status).json(error.body);
        } else {
            internalServerError(res)
        }
    }
});

app.use('/api/internal/delete', async (req, res) => {
    try {
        const {title} = req.body;
        const result = await handleFileDelete(title);
        res.status(result.status).json(result.body);
    } catch (error) {
        if (error && error.status && error.body) {
            res.status(error.status).json(error.body);
        } else {
            internalServerError(res);
        }
    }
});

app.use('/api/internal/list', async (req, res) => {
    try {
        const result = await handleFileList();
        res.status(result.status).json(result.body);
    } catch (error) {
        internalServerError(res);
    }
});

app.listen(port, () => {
    console.log(`Bex-note started ${port}`)
})