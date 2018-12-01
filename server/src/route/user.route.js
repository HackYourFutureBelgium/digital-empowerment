const users = require('../controller/user.controller');

module.exports = (app) => {
  app.post('/user', users.create);
  app.post('/user/login', users.login);
};
