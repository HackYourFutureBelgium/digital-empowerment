const users = require('../controller/user.controller');
const verifyToken = require('../verify-token');
const requireAdmin = require('../require-admin');

module.exports = (app) => {
  app.get('/user', [verifyToken, requireAdmin], users.findAll);
  app.post('/user', verifyToken, users.create);
  app.post('/user/login', users.login);
  app.put('/user/password', users.resetPassword);
  app.patch('/user/:userId', [verifyToken, requireAdmin], users.update);
  app.delete('/user/:userId', [verifyToken, requireAdmin], users.delete);
};
