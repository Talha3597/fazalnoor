exports.student = require('./student.controller');


exports.App = {
    PNF: (req, res) => {
      res.status(400).json({
        message: "invalid routes",
      });
    },
  };