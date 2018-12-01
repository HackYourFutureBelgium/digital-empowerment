const verifyToken = require('../verify-token');
const paths = require('../controller/path.controller');
const modules = require('../controller/module.controller');

module.exports = (app) => {
  app.get('/path', paths.findAll);
  app.get('/path/:pathId', paths.findOne);
  app.post('/path', verifyToken, paths.create);
  app.post('/path/:pathId/module', verifyToken, modules.create);
  app.patch('/path/:pathId', verifyToken, paths.update);
  app.delete('/path/:pathId', verifyToken, paths.delete);
};
