const useHealthController = (app) => {

    app.get('/api/healthcheck', (req, res) => {
        res.status(200).end();
    });
};

module.exports = {useHealthController};
