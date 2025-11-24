const {handleFileSave} = require('./service/note/fileSaver');
const {handleFileDelete} = require('./service/note/fileDelete');
const {handleFileList} = require('./service/note/fileList');
const {handleFileContent} = require('./service/note/fileContent');
const express = require('express')

const app = express()
const port = 3000
const environmentProvider = require('./configProvider');
const { checkAuthorize} = require('./middleware/auth');
const { authorize } = require('./service/authorization/authorizeService');
const {getPort} = require("./configProvider");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(environmentProvider.getStaticFileForWeb()));

app.use('/api/internal', (req, res, next) => {
    const response = checkAuthorize(req.headers['x-auth-token']);
    if (response) {
        return res.status(response.status)
            .json(response.body);
    }
    next();
});

app.post('/api/authorize', (req, res) => {
    const {username, password} = req.body;
    const result = authorize(username, password);
    res.status(result.status).json(result.body);
});

app.get('/api/healthcheck', (req, res) => {
    res.status(200).end();
});

app.post('/api/internal/note/save', async (req, res) => {
    const {title, content} = req.body;
    const result = await handleFileSave(title, content);
    res.status(result.status).end();
});

app.delete('/api/internal/note/delete', async (req, res) => {
    const {title} = req.body;
    const result = await handleFileDelete(title);
    res.status(result.status).end();
});

app.get('/api/internal/note/list', async (req, res) => {
    const result = await handleFileList();
    res.status(result.status).json(result.body);
});

app.post('/api/internal/note/content', async (req, res) => {
    const {title} = req.body;
    const result = await handleFileContent(title);
    res.status(result.status).json(result.body);
});

if (require.main === module) {
    app.listen(getPort(), () => {
        console.log(`Bex-note started ${port}`)
    });
}

module.exports = app;
