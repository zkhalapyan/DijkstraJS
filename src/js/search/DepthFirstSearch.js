
dijkstra.search.DepthFirstSearch = (function () {
    "use strict";

    var that = {};

    that.search = function (rootNode, callback) {
        var stack = [rootNode],
            currentNode,
            children,
            visited = {},
            i;
        while (stack.length > 0) {
            currentNode = stack.pop();
            children = currentNode.getChildren();
            for (i = 0; i < children.length; i += 1) {
                if (!visited[children[i]]) {
                    callback(currentNode, children[i]);
                    stack.push(children[i]);
                    visited[children[i]] = true;
                }
            }
        }
    };

    return that;

}());