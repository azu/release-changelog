"use strict";
var releaseIt = require("release-it");
var Promise = require("bluebird");
var changelog = require("./changelog");
var path = require("path");
var util = require("./util");
var PACKAGE_FILE = path.resolve(process.cwd(), 'package.json');
function getCurrentVersion() {
    return require(PACKAGE_FILE).version;
}
function execute(option) {
    var releaseVersion = util.increment(getCurrentVersion(), option.increment);
    var changeLogOption = {
        "debug": option["debug"],
        "dry-run": option['dry-run'],
        "releaseVersion": releaseVersion
    };
    return Promise.all([
        changelog.getCurrentChangeLogPromise(changeLogOption), changelog.writeChangeLogPromise(changeLogOption)
    ]).then(function (results) {
        var changelog = results[0];
        option.tagAnnotation = "Release %s\n" + changelog;
        return releaseIt.execute(option);
    });
}
module.exports.execute = execute;