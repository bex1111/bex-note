const app = require("../app");

app.get('/api/healthcheck', (req, res) => {
    res.status(200).end();
});
