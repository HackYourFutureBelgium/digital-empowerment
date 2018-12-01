const Module = require('../model/module.model');
const paths = require('./path.controller');

exports.findAll = (req, res) => {
  Module.find()
    .then((modules) => { res.send(modules); })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.create = (req, res) => {
  const newModule = new Module(req.body);
  newModule
    .save()
    .then(async (createdModule) => {
      const { pathId } = req.params;
      if (pathId) await paths.addModuleToPath(pathId, createdModule._id);
      res.send(createdModule);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const { moduleId } = req.params;
  Module.findOneAndUpdate({ _id: moduleId }, req.body, { new: true })
    .then((mod) => {
      if (!mod) {
        return res.status(404).send({
          message: `Module with id "${moduleId}" not found`
        });
      }
      return res.send(mod);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Module with id "${moduleId}" not found`
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const { moduleId } = req.params;
  Module.findOneAndDelete({ _id: moduleId })
    .then((mod) => {
      if (!mod) {
        return res.status(404).send({
          message: `Module with id "${moduleId}" not found`
        });
      }
      return res.status(204).send({ message: 'Module deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Module with id "${moduleId}" not found`
        });
      }
      return res.status(500).send({ message: err.message });
    });
};
