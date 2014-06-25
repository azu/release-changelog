"use strict";
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var conventional = require('conventional-changelog');
var CHANGELOG_FILE = path.resolve(process.cwd(), 'CHANGELOG.md');
var PACKAGE_FILE = path.resolve(process.cwd(), 'package.json');
function stripTrailingSlash(string) {
    return string.replace(/\/+$/, "");
}
function getConventialOptions(cliOption) {
    var homepage = require(PACKAGE_FILE).homepage;
    if (!homepage) {
        return reject(new Error("Not found `homepage` filed in package.json"));
    }
    var object = {
        repository: stripTrailingSlash(homepage),
        file: CHANGELOG_FILE,
        version: cliOption.releaseVersion,
        grep: '^feat|^fix|^write|^docs|BREAKING'
    };
    if (cliOption["debug"]) {
        object.log = console.log.bind(console);
    } else {
        object.log = function () {
        }
    }
    return  object
}
function writeChangeLogPromise(cliOption) {
    if (cliOption["dry-run"]) {
        return Promise.resolve("dry-run");
    }
    return new Promise(function (resolve, reject) {
        conventional(getConventialOptions(cliOption), function (error, log) {
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
function getCurrentChangeLogPromise(cliOption) {
    return new Promise(function (resolve, reject) {
        var options = getConventialOptions(cliOption);
        options.file = "";// prev...current only
        conventional(options, function (error, log) {
            if (error) {
                reject(error);
            } else {
                if (cliOption["debug"]) {
                    console.log(log);
                }
                resolve(log);
            }
        });
    });
}
module.exports.writeChangeLogPromise = writeChangeLogPromise;
module.exports.getCurrentChangeLogPromise = getCurrentChangeLogPromise;