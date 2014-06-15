"use strict";
var releaseIt = require("release-it");
var Promise = require("bluebird");
var changelog = require("./changelog");
function execute(option) {
    return Promise.all([
        changelog.getCurrentChangeLogPromise(), changelog.writeChangeLogPromise()
    ]).then(function (results) {
        var changelog = results[0];
        option.tagAnnotation = "Release %s\n" + changelog;
        return releaseIt.execute(option);
    });
}
module.exports.execute = execute;