"use strict";
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var conventional = require('conventional-changelog');
var CHANGELOG_FILE = path.resolve(process.cwd(), 'CHANGELOG.md');
var PACKAGE_FILE = path.resolve(process.cwd(), 'package.json');
function getConventialOptions(version) {
    var homepage = require(PACKAGE_FILE).homepage;
    if (!homepage) {
        return reject(new Error("Not found `homepage` filed in package.json"));
    }
    return {
        repository: homepage,
        file: CHANGELOG_FILE,
        version: version,
        grep: '^feat|^fix|^write|BREAKING',
        log: function () {
        }
    }
}
function writeChangeLogPromise(version) {
    return new Promise(function (resolve, reject) {
        conventional(getConventialOptions(version), function (error, log) {
            // write file
            fs.writeFile(CHANGELOG_FILE, log, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    });
}
function getCurrentChangeLogPromise(version) {
    return new Promise(function (resolve, reject) {
        var options = getConventialOptions(version);
        options.file = "" // prev...current only
        conventional(options, function (error, log) {
            if (error) {
                reject(error);
            } else {
                resolve(log);
            }
        });
    });
}
module.exports.writeChangeLogPromise = writeChangeLogPromise;
module.exports.getCurrentChangeLogPromise = getCurrentChangeLogPromise;