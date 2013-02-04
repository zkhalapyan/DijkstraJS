
dijkstra.parse.CSVAdjacencyListParser = (function () {
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
            node,
            adjacentNodes;
        fs.readFile(fileName, function (err, data) {
            //LineReader should encapsulate reusable code.
            fileLines = data.toString().split(/\n/);
            numLines = fileLines.length;
            for (i = 1; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    colonSplit = fileLine.split(/[\s]*,[\s]*/);
                    node = colonSplit.shift();
                    adjacentNodes = (colonSplit.length > 0) ? colonSplit : [];
                    adjacencyList.addEdges(node, adjacentNodes);
                }
            }
            callback(adjacencyList);
        });
    };

    return that;
}());