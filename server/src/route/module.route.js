const verifyToken = require('../verify-token');
const modules = require('../controller/module.controller.js');

module.exports = (app) => {
  app.get('/module', modules.findAll);
  app.post('/module', verifyToken, modules.create);
  app.patch('/module/:moduleId', verifyToken, modules.update);
  app.delete('/module/:moduleId', verifyToken, modules.delete);
};
