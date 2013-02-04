
(function () {
    "use strict";

    try {
        var reporter = require('nodeunit').reporters.minimal;
    } catch (e) {
        console.log("Cannot find nodeunit module.");
        process.exit(-1);
    }

    var error = false;

    reporter.run(['js/graph'], null, function (e) {
        if (e) {
            error = true;
        }
    });

    process.on('exit', function () {
        if (error) {
            process.exit(-1);
        }
    });

}());

