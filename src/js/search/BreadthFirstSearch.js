
dijkstra.search.BreadthFirstSearch = (function () {
    "use strict";

    var that = {};

    that.searchWithAdjacencyList = function (rootNode, adjacencyList, callback) {
        return that.search(rootNode, callback, function (node) {
            return adjacencyList.getChildren(node);
        });
    };

    that.searchWithGraphNode = function (rootNode, callback) {
        return that.search(rootNode, callback, function (node) {
            return node.getChildren();
        });
    };

    that.search = function (rootNode, callback, getChildrenCallback) {
        var queue = [rootNode],
            currentNode,
            children,
            visited = {},
            numChildren,
            i;
        while (queue.length > 0) {
            currentNode = queue.shift();
            children = getChildrenCallback(currentNode);
            numChildren = children.length;
            for (i = 0; i < numChildren; i += 1) {
                if (!visited[children[i]]) {
                    callback(currentNode, children[i]);
                    queue.push(children[i]);
                    visited[children[i]] = true;
                }
            }
        }
    };

    return that;

}());