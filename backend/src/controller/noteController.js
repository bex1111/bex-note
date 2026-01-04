const {handleSave} = require("../service/note/newFileSaverService");
const {handleDelete} = require("../service/note/fileDelete");
const {handleFileList} = require("../service/note/fileList");
const {handleFileContent} = require("../service/note/fileContent");
const {handleUpdate} = require("../service/note/noteUpdaterService");

const useNoteController = (app) => {

    app.post('/api/internal/note/save', async (req, res) => {
        const {title, content} = req.body;
        const result = await handleSave(title, content);
        res.status(result.status).json(result.body);
    });

    app.put('/api/internal/note/update', async (req, res) => {
        const {newTitle, oldTitle, content} = req.body;
        const result = await handleUpdate(newTitle, oldTitle, content);
        res.status(result.status).json(result.body);
    });

    app.delete('/api/internal/note/delete', async (req, res) => {
        const {title} = req.body;
        const result = await handleDelete(title);
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
}

module.exports = {useNoteController};