"use strict";
var releaseIt = require("release-it");
var Promise = require("bluebird");
var changelog = require("./changelog");
var PACKAGE_FILE = path.resolve(process.cwd(), 'package.json');
function getCurrentVersion() {
    return require(PACKAGE_FILE).version;
}
function execute(option) {
    var releaseVersion = util.increment(getCurrentVersion(), options.increment);
    return Promise.all([
        changelog.getCurrentChangeLogPromise(releaseVersion), changelog.writeChangeLogPromise(releaseVersion)
    ]).then(function (results) {
        var changelog = results[0];
        option.tagAnnotation = "Release %s\n" + changelog;
        return releaseIt.execute(option);
    });
}
module.exports.execute = execute;