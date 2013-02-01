
dijkstra.graph.AdjacencyList = function () {
    "use strict";

    var that = {};

    var adjacencyList = {};

    that.addEdges = function (parentNode, childNodes) {
        var i;
        for (i = 0; i < childNodes.length; i += 1) {
            that.addEdge(parentNode, childNodes[i]);
        }
    };

    that.addEdge = function (parentNode, childNode) {
        if (adjacencyList[parentNode]) {
            adjacencyList[parentNode].push(childNode);
        } else {
            adjacencyList[parentNode] = [childNode];
        }
    };

    that.getChildren = function (node) {
        return adjacencyList[node] || [];
    };

    that.getAdjacencyList = function () {
        return adjacencyList;
    };

    return that;
};