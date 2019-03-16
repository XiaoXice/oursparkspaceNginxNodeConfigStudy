let mongoose = require("mongoose");
let schema = require("./index");

module.exports = mongoose.model("commit",schema.commitSchema);