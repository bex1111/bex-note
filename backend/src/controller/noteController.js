const {handleFileSave} = require("../service/note/fileSaver");
const {handleFileDelete} = require("../service/note/fileDelete");
const {handleFileList} = require("../service/note/fileList");
const {handleFileContent} = require("../service/note/fileContent");
const app = require("../app");

app.post('/api/internal/note/save', async (req, res) => {
    const {title, content} = req.body;
    const result = await handleFileSave(title, content);
    res.status(result.status).json(result.body);
});

app.delete('/api/internal/note/delete', async (req, res) => {
    const {title} = req.body;
    const result = await handleFileDelete(title);
    res.status(result.status).json(result.body);
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