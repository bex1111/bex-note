const {authorize} = require("../service/authorization/authorizeService");
const {logout} = require("../service/authorization/logoutService");
const app = require("../app");

app.post('/api/authorize', async (req, res) => {
    const {username, password} = req.body;
    const result = await authorize(username, password);
    res.status(result.status).json(result.body);
});

app.post('/api/internal/logout', async (req, res) => {
    const {token} = req.body;
    const result = await logout(token);
    res.status(result.status).json(result.body);
});