"use strict";
var releaseChangelog = require("./release-changelog");
var cliOptions = require("./options");
module.exports = function (args) {
    var options = cliOptions.parse(args);
    return releaseChangelog.execute(options);
};