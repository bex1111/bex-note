const { handleFileSave } = require('./fileSaver');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const filesApi = require('./fileSaver');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})