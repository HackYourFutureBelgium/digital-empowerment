const modules = require('../controller/module.controller.js');

module.exports = (app) => {
  app.get('/module', modules.findAll);
  app.post('/module', modules.create);
};
