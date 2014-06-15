"use strict";
var changelog = require("./changelog");
var releaseIt = require("release-it");
var Promise = require("bluebird");
var originalReleaseIt = releaseIt.execute;
function execute(args) {
    return Promise.all([
        changelog.getCurrentChangeLogPromise(), changelog.writeChangeLogPromise()
    ]).then(function (results) {
        var changelog = results[0];
        releaseIt.execute = function (options) {
            options.tagAnnotation = changelog;
            originalReleaseIt(options);
        }.bind(releaseIt);
        return releaseIt.cli(args);
    });
}
module.exports.execute = execute;