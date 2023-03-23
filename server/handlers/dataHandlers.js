const { parameters } = require("../data/parameters");

// Get the parameters used for receipe search
const getData = (req, res) => {
  res.status(200).json({
    status: 200,
    data: parameters,
  });
};

module.exports = { getData };
