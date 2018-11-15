const Path = require('../model/path.model');

exports.create = (req, res) => {
  const newPath = new Path(req.body);
  newPath
    .populate()
    .save()
    .then((data) => { res.send(data); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
