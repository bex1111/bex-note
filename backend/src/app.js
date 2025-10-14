const {handleFileSave} = require('./service/fileSaver');
const {handleFileDelete} = require('./service/fileDelete');
const {handleFileList} = require('./service/fileList');
const express = require('express')
const app = express()
const port = 3000
const environmentProvider = require('./environmentProvider');
const {isAuthorized, unauthorizedResponse, authorize} = require('./middleware/auth');
const {getFileContent} = require("./service/fileContent");

const internalServerError = (res, error) => {
    console.log(error)
    res.status(500).json({error: 'Internal server error'});
}

app.use(express.json());
// app.use(express.static(environmentProvider.getStaticFileForWebEnv()));

app.use('/api/internal', (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token || !isAuthorized(token)) {
        return res.status(unauthorizedResponse.status)
            .json(unauthorizedResponse.body);
    }
    next();
});

app.post('/api/authorize', (req, res) => {
    const {username, password} = req.body;
    const result = authorize(username, password);
    res.status(result.status).json(result.body);
});

app.post('/api/internal/note/save', async (req, res) => {
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

app.delete('/api/internal/note/delete', async (req, res) => {
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

app.get('/api/internal/note/list', async (req, res) => {
    try {
        const result = await handleFileList();
        res.status(result.status).json(result.body);
    } catch (error) {
        internalServerError(res);
    }
});

app.get('/api/internal/note/content', async (req, res) => {
        const result = await handleFileContent();
        res.status(result.status).json(result.body);
});

app.listen(port, () => {
    console.log(`Bex-note started ${port}`)
})