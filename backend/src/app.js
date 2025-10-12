const { handleFileSave } = require('./fileSaver');
const { handleFileDelete } = require('./fileDelete');
const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/save', async (req, res) => {
    try {
        const { title, content } = req.body;
        const result = await handleFileSave(title, content);
        res.status(result.status).json(result.body);
    } catch (error) {
        if (error && error.status && error.body) {
            res.status(error.status).json(error.body);
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.use('/api/delete', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await handleFileDelete(title);
        res.status(result.status).json(result.body);
    } catch (error) {
        if (error && error.status && error.body) {
            res.status(error.status).json(error.body);
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})