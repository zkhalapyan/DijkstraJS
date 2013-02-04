
dijkstra.parse.FileLineReader = (function () {
    "use strict";
    var fs = require('fs');

    var that = {};

    that.startRead = function (fileName, lineReadCallback, readCompleteCallback) {
        var fileLines,
            numLines,
            fileLine,
            i;
        fs.readFile(fileName, function (err, data) {
            fileLines = data.toString().split(/\n/);
            numLines = fileLines.length;
            for (i = 0; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    lineReadCallback(fileLine);
                }
            }
            readCompleteCallback(numLines);
        });
    };

    return that;
}());
