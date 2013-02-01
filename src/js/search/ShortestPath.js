dijkstra.search.ShortestPath = (function () {
    "use strict";

    var that = {};

    var BreadthFirstSearch = dijkstra.search.BreadthFirstSearch;

    that.findShortestPathWithBFS = function (rootNode, adjacencyList, callback) {
        var distance = { },
            parent = { },
            currentDistance,

            onDoneCallback = function () {
                callback(distance, parent);
            },

            onVisitCallback = function (parentNode, childNode) {
                currentDistance = distance[parentNode] + 1;
                if (!distance.hasOwnProperty(childNode) || currentDistance < distance[childNode]) {
                    parent[childNode] = parentNode;
                    distance[childNode] = currentDistance;
                }
            };
        distance[rootNode] = 0;
        BreadthFirstSearch.searchWithAdjacencyList(rootNode, adjacencyList, onVisitCallback, onDoneCallback);
    };

    return that;
}());
