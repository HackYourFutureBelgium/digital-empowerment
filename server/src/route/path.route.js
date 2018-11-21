const paths = require('../controller/path.controller.js');

module.exports = (app) => {
  app.get('/path', paths.findAll);
  app.post('/path', paths.create);
};
