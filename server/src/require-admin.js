const requireAdmin = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.status(403).send({ message: 'Unauthorized' });
};

module.exports = requireAdmin;
