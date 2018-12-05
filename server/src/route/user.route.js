const users = require('../controller/user.controller');
const verifyToken = require('../verify-token');

module.exports = (app) => {
  app.get('/user', verifyToken, users.findAll);
  app.post('/user', verifyToken, users.create);
  app.post('/user/login', users.login);
};
