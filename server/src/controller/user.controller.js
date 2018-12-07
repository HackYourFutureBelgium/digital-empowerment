const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { sendPasswordResetEmail } = require('../email');

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(401).send({ message: 'Invalid username or password' });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ token: null });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '120ms' // 3 days
      });

      return res.status(200).send({
        token,
        _id: user._id,
        email: user.email,
        role: user.role
      });
    });
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // "accept" the password reset request even if the email isn't tied to a registered user account
  // https://ux.stackexchange.com/questions/87079/reset-password-appropriate-response-if-email-doesnt-exist
  if (!user) return res.status(202).send();
  return crypto.randomBytes(64, async (err, buffer) => {
    const token = buffer.toString('hex');
    user.passwordResetToken = token;
    await user.save();
    sendPasswordResetEmail(user.email, token)
      .then(() => res.status(202).send())
      .catch(mailError => console.log(mailError));
  });
};

const completePasswordReset = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({ passwordResetToken: token });
  if (!user) return res.status(401).send({ message: 'Invalid token' });

  user.password = bcrypt.hashSync(password, 8);
  user.passwordResetToken = null;
  await user.save();

  return res.status(204).send({ message: 'New password set successfully' });
};

exports.resetPassword = (req, res) => {
  const { token } = req.body;
  if (!token) return requestPasswordReset(req, res);
  return completePasswordReset(req, res);
};

exports.findAll = (req, res) => {
  User.find()
    .select('-password')
    .select('-passwordResetToken')
    .then((users) => { res.send(users); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const { userId } = req.params;
  User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
    .select('-password')
    .select('-passwordResetToken')
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
  const user = new User({ email, role });
  user.isPending = true;
  user
    .save()
    .then(newUser => res.send(newUser))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
