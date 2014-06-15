"use strict";
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var conventional = require('conventional-changelog');
var CHANGELOG_FILE = path.resolve(process.cwd(), 'CHANGELOG.md');
var PACKAGE_FILE = path.resolve(process.cwd(), 'package.json');
function writeChangeLogPromise() {
    return new Promise(function (resolve, reject) {
        if (!PACKAGE_FILE) {
            return reject(new Error("Not found package.json"));
        }
        var homepage = require(PACKAGE_FILE).homepage;
        if (!homepage) {
            return reject(new Error("Not found `homepage` filed in package.json"));
        }
        conventional({
            repository: homepage,
            file: CHANGELOG_FILE,
            version: require(PACKAGE_FILE).version,
            grep: '^feat|^fix|^write|BREAKING'
        }, function (error, log) {
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
function getCurrentChangeLogPromise() {
    return new Promise(function (resolve, reject) {
        if (!PACKAGE_FILE) {
            return reject(new Error("Not found package.json"));
        }
        var homepage = require(PACKAGE_FILE).homepage;
        if (!homepage) {
            return reject(new Error("Not found `homepage` filed in package.json"));
        }
        conventional({
            repository: homepage,
            file: "", // ignore default
            version: require(PACKAGE_FILE).version,
            grep: '^feat|^fix|^write|BREAKING'
        }, function (error, log) {
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