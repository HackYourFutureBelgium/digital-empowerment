const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(401).send({ message: 'Invalid username or password' });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ token: null });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 259200 // 3 days
      });

      return res.status(200).send({
        token,
        _id: user._id,
        email: user.email,
        role: user.role
      });
    });
};

exports.findAll = (req, res) => {
  User.find().select('-password')
    .then((users) => { res.send(users); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const { userId } = req.params;
  User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const { userId } = req.params;
  if (userId === req.user._id) {
    return res.status(400).send({ message: 'You cannot delete your own account' });
  }
  return User.findOneAndDelete({ _id: userId })
    .then(() => res.status(204).send({ message: 'User deleted successfully!' }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.create = (req, res) => {
  const { email, role } = req.body;
  // newUser.password = bcrypt.hashSync(newUser.password, 8);
  const user = new User({ email, role });
  user.isPending = true;
  user
    .save()
    .then(newUser => res.send(newUser))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
