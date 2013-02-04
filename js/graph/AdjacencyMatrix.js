
dijkstra.graph.AdjacencyMatrix = function (numNodes) {
    "use strict";

    var that = {};

    var matrix = [];

    that.addEdge = function (parentNode, childNode) {
        matrix[parentNode][childNode] = true;
    };

    that.removeEdge = function (parentNode, childNode) {
        matrix[parentNode][childNode] = true;
    };

     //Initialize the adjacency matrix to a disconnected graph.
    (function () {
        var i, j, currentRow;
        for (i = 0; i < numNodes; i += 1) {
            currentRow = [];
            for (j = 0; j < numNodes; j += 1) {
                currentRow.push(false);
            }
            matrix.push(currentRow);
        }
    }());

    return that;
};