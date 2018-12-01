const bcrypt = require('bcryptjs');
const User = require('../model/user.model');

exports.create = (req, res) => {
  const newUser = { ...req.body };
  newUser.password = bcrypt.hashSync(newUser.password, 8);
  newUser.role = 'user';
  const user = new User(newUser);
  user
    .save()
    .then(({ _id, email, role }) => {
      res.send({ _id, email, role });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
