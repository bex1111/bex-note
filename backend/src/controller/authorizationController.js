const {authorize} = require("../service/authorization/authorizeService");
const {logout} = require("../service/authorization/logoutService");

const useAuthorizationController = (app) => {
    app.post('/api/authorize', (req, res) => {
        const {username, password} = req.body;
        const result = authorize(username, password);
        res.status(result.status).json(result.body);
    });

    app.post('/api/internal/logout', (req, res) => {
        const {token} = req.body;
        const result = logout(token);
        res.status(result.status).json(result.body);
    });
};

module.exports = {useAuthorizationController};