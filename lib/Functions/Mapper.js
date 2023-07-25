const functions = require("./UsefulStuff");

const Map = (obj, data) => {
  if (!functions.isEmpty(data)) {
    for (var name in data) {
      if (obj.hasOwnProperty(name)) {
        obj[name] = data[name];
      }
    }
  }
};

module.exports.Map = Map;