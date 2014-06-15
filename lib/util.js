var semver = require("semver");
function increment(version, increment) {
    increment = increment || 'patch';
    if (['major', 'minor', 'patch'].indexOf(increment) === -1) {
        return increment;
    } else {
        return semver.inc(version, increment);
    }
}

module.exports = {
    increment: increment
};
