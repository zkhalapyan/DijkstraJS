
var dijkstra = {
    parse : {},
    graph : {},
    search : {}
};

module.exports = dijkstra;

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
            fileLines = data.toString().split(";");
            numLines = fileLines.length;
            for (i = 1; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    colonSplit = fileLine.split(/[\s]*:[\s]*/);
                    adjacentNodes = (colonSplit.length > 1 && colonSplit[1].length > 0) ? colonSplit[1].split(" ") : [];
                    adjacencyList.addEdges(colonSplit[0], adjacentNodes);
                }
            }
            callback(adjacencyList);
        });
    };

    return that;
};

dijkstra.parse.CSVAdjacencyListParser = (function () {
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
            node,
            adjacentNodes;
        fs.readFile(fileName, function (err, data) {
            //LineReader should encapsulate reusable code.
            fileLines = data.toString().split(/\n/);
            numLines = fileLines.length;
            for (i = 1; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    colonSplit = fileLine.split(/[\s]*,[\s]*/);
                    node = colonSplit.shift();
                    adjacentNodes = (colonSplit.length > 0) ? colonSplit : [];
                    adjacencyList.addEdges(node, adjacentNodes);
                }
            }
            callback(adjacencyList);
        });
    };

    return that;
}());

dijkstra.parse.FileLineReader = (function () {
    "use strict";
    var fs = require('fs');

    var that = {};

    that.startRead = function (fileName, lineReadCallback, readCompleteCallback) {
        var fileLines,
            numLines,
            fileLine,
            i;
        fs.readFile(fileName, function (err, data) {
            fileLines = data.toString().split(/\n/);
            numLines = fileLines.length;
            for (i = 0; i < numLines;  i += 1) {
                fileLine = fileLines[i].trim();
                if (fileLine.length > 0) {
                    lineReadCallback(fileLine);
                }
            }
            readCompleteCallback(numLines);
        });
    };

    return that;
}());


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

