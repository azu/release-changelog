"use strict";
var releaseChangelog = require("./release-changelog");
module.exports = function (args) {
    return releaseChangelog.execute(args);
}