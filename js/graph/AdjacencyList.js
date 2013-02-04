
dijkstra.graph.AdjacencyList = function () {
    "use strict";

    var that = {};

    var adjacencyMap = {};

    that.addEdges = function (parentNode, childNodes) {
        var numChildren = childNodes.length,
            i;
        if (numChildren > 0) {
            for (i = 0; i < numChildren; i += 1) {
                that.addEdge(parentNode, childNodes[i]);
            }
        } else {
            adjacencyMap[parentNode] = [];
        }
    };

    that.addEdge = function (parentNode, childNode) {
        if (adjacencyMap[parentNode]) {
            adjacencyMap[parentNode].push(childNode);
        } else {
            adjacencyMap[parentNode] = [childNode];
        }
    };

    that.getChildren = function (node) {
        return adjacencyMap[node] || [];
    };

    that.getAdjacencyMap = function () {
        return adjacencyMap;
    };

    that.getNodeList = function () {
        var node,
            nodeList = [];
        for (node in adjacencyMap) {
            if (adjacencyMap.hasOwnProperty(node)) {
                nodeList.push(node);
            }
        }
        return nodeList;
    };

    return that;
};