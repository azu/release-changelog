"use strict";
var changelog = require("./changelog");
var releaseIt = require("release-it");

function execute() {
    changelog.getCurrentChangeLogPromise().then(function (log) {
        releaseIt.execute({
            tagAnnotation: log
        });
    });
}
module.exports.execute = execute;