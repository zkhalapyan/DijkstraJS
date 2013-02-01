dijkstra.search.ShortestPath = (function () {
    "use strict";

    var that = {};

    var BreadthFirstSearch = dijkstra.search.BreadthFirstSearch;

    that.findShortestPathWithBFS = function (rootNode, adjacencyList, callback) {
        var distance = { },
            parentMap = { },
            currentDistance,

            onDoneCallback = function () {
                callback(distance, parentMap);
            },

            onVisitCallback = function (parentNode, childNode) {
                currentDistance = distance[parentNode] + 1;
                if (!distance.hasOwnProperty(childNode) || currentDistance < distance[childNode]) {
                    parentMap[childNode] = parentNode;
                    distance[childNode] = currentDistance;
                }
            };
        distance[rootNode] = 0;
        BreadthFirstSearch.searchWithAdjacencyList(rootNode, adjacencyList, onVisitCallback, onDoneCallback);
    };

    that.backtrackPath = function (srcNode, dstNode, parentMap, onNextStepCallback, onDoneCallback) {
        var currentNode = dstNode,
            previousNode;
        while (true) {

            //The path from destination to source is complete.
            if (currentNode === srcNode) {
                onDoneCallback(true);
                break;

            //There is no path from destination to source.
            } else if (!parentMap.hasOwnProperty(currentNode)) {
                onDoneCallback(false);
                break;
            }

            previousNode = parentMap[currentNode];
            onNextStepCallback(previousNode, currentNode);
            currentNode = previousNode;
        }

    };

    return that;
}());
