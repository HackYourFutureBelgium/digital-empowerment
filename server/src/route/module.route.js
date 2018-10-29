const modules = require('../controller/module.controller.js');

module.exports = (app) => {
  app.get('/modules', modules.findAll);
};
