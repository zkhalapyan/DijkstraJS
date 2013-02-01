var dijkstra = {
    parse : {},
    graph : {},
    search : {}
};

module.exports = dijkstra;

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


dijkstra.graph.GraphNode = function (name, value, children) {
    "use strict";

    var that = {};

    children = children || [];

    that.getName = function () {
        return name;
    };

    that.getValue = function () {
        return value;
    };

    that.getChildren = function () {
        return children;
    };

    return that;
};

dijkstra.parse.AdjacencyListParser = function () {
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
            adjacentNodes;
        fs.readFile(fileName, function (err, data) {
            fileLines = data.toString().split(" ;");
            numLines = fileLines.length;
            for (i = 1; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    colonSplit = fileLine.split(":  ");
                    adjacentNodes = colonSplit[1].split(" ");
                    adjacencyList.addEdges(colonSplit[0], adjacentNodes);
                }
            }
            callback(adjacencyList);
        });
    };

    return that;
};







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
