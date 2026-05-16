const spec = require('../swagger-spec.json');

const useSwaggerController = (app) => {
    app.get('/api/docs/swagger.json', (req, res) => res.json(spec));
};

module.exports = { useSwaggerController };
