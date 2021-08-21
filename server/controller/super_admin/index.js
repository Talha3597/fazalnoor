exports.SuperAdmin = require('./SD_controller')

exports.App = {
    PNF: (req, res) => {
      res.status(400).json({
        message: "invalid routes",
      });
    },
  };