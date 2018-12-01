const User = require('../model/user.model');

exports.create = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((data) => { res.send(data); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
