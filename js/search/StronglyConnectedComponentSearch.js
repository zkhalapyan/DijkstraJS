
dijkstra.search.StronglyConnectedComponentSearch = (function () {
    "use strict";
    var that = {};

    var BFS = dijkstra.search.BreadthFirstSearch;

    /**
     *
     * @param srcNode The source node of the path.
     * @param dstNode The destination node of the path.
     * @param adjacencyList The adjacency list representing the graph.
     * @param onDoneCallback Invoked when the search is complete with a single boolean argument value.
     */
    var checkPath = function (srcNode, dstNode, adjacencyList, onDoneCallback) {
        console.log("Checking for path between: " + srcNode + " and " + dstNode + ".");
        BFS.searchWithAdjacencyList(srcNode, adjacencyList, null, function (visited) {
            onDoneCallback(visited.hasOwnProperty(dstNode));
        });
    };

    that.search = function (adjacencyList, onDoneCallback) {
        var nodeList = adjacencyList.getNodeList(),
            nodeMap = adjacencyList.getAdjacencyMap(),
            visitedMap = {},
            node,
            doSearch = function () {
                if (nodeList.length === 0) {
                    onDoneCallback(true);

                } else {
                    node = nodeList.pop();
                    console.log("Checking node: " + node);
                    if (nodeMap[-node]) {
                        checkPath(node, -node, adjacencyList, function (pathExists) {
                            if (pathExists) {
                                onDoneCallback(false);
                            } else {
                                doSearch();
                            }
                        });
                    } else {
                        doSearch();
                    }
                }
            };
        doSearch();

    };
    return that;
}());
