const paths = require('../controller/path.controller.js');

module.exports = (app) => {
  app.get('/path', paths.findAll);
  app.get('/path/:pathId', paths.findOne);
  app.post('/path', paths.create);
};
