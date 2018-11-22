const paths = require('../controller/path.controller');
const modules = require('../controller/module.controller');

module.exports = (app) => {
  app.get('/path', paths.findAll);
  app.get('/path/:pathId', paths.findOne);
  app.post('/path', paths.create);
  app.post('/path/:pathId/module', modules.create);
};
