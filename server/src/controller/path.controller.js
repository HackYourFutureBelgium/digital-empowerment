const Path = require('../model/path.model');

exports.findAll = (req, res) => {
  Path.find()
    .then((modules) => { res.send(modules); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  Path.findById(req.params.pathId)
    .populate('modules')
    .then((path) => { res.send(path); })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

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

exports.addModuleToPath = async (pathId, moduleId) => {
  const path = await Path.findById(pathId);
  path.modules.push(moduleId);
  await path.save();
  Path.findOneAndUpdate({ _id: pathId }, path, { new: true });
};
