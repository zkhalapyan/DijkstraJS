
dijkstra.search.BreadthFirstSearch = (function () {
    "use strict";

    var that = {};

    /**
     *
     * @param rootNode
     * @param adjacencyList
     * @param visitCallback
     * @param doneCallback
     * @return {*}
     */
    that.searchWithAdjacencyList = function (rootNode, adjacencyList, visitCallback, doneCallback) {
        return that.search(rootNode, visitCallback, doneCallback, function (node) {
            return adjacencyList.getChildren(node);
        });
    };

    /**
     *
     * @param rootNode
     * @param visitCallback
     * @param doneCallback
     * @return {*}
     */
    that.searchWithGraphNode = function (rootNode, visitCallback, doneCallback) {
        return that.search(rootNode, visitCallback, doneCallback, function (node) {
            return node.getChildren();
        });
    };

    /**
     *
     * @param rootNode
     * @param visitCallback
     * @param doneCallback
     * @param getChildrenCallback
     */
    that.search = function (rootNode, visitCallback, doneCallback, getChildrenCallback) {
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
                if (visitCallback) {
                    visitCallback(currentNode, children[i]);
                }
                if (!visited[children[i]]) {
                    queue.push(children[i]);
                    visited[children[i]] = true;
                }
            }
        }

        if (doneCallback) {
            doneCallback(visited);
        }
    };

    return that;

}());