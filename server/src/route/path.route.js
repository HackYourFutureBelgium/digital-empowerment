const paths = require('../controller/path.controller.js');

module.exports = (app) => {
  app.post('/path', paths.create);
};
