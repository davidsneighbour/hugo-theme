const defaultStandardVersion = require("@davidsneighbour/standard-version-config");
const localStandardVersion = {
  skip: {
    changelog: true
  }
};

module.exports = {
  ...defaultStandardVersion,
  ...localStandardVersion,
};
