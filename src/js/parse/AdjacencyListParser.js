dijkstra.parse.AdjacencyListParser = function () {
    "use strict";
    var fs = require('fs');

    var that = {};

    that.parseAdjacencyList = function (fileName, callback) {
        var fileLines,
            numLines,
            fileLine,
            adjacencyList = dijkstra.graph.AdjacencyList(),
            i,
            colonSplit,
            adjacentNodes;
        fs.readFile(fileName, function (err, data) {
            fileLines = data.toString().split(";");
            numLines = fileLines.length;
            for (i = 1; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    colonSplit = fileLine.split(/[\s]*:[\s]*/);
                    adjacentNodes = (colonSplit.length > 1 && colonSplit[1].length > 0) ? colonSplit[1].split(" ") : [];
                    adjacencyList.addEdges(colonSplit[0], adjacentNodes);
                }
            }
            callback(adjacencyList);
        });
    };

    return that;
};





