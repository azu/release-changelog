"use strict";
var args = [].slice.call(process.argv, 2);
require("../lib/cli")(args).then(function () {
    process.exit(0);
}, function (error) {
    console.error(error);
    process.exit(1);
});