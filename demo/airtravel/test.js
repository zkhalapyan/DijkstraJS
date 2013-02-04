var dijkstra = require("./../../build/js/dijkstra.js");

dijkstra.parse.AdjacencyListParser().parseAdjacencyList("airtravel.graph", function (adjacencyList) {
    "use strict";

    //console.log(adjacencyList.getAdjacencyMap());


    /*
    dijkstra.search.BreadthFirstSearch.searchWithAdjacencyList(1, adjacencyList, function (parentNode, childNode) {
        console.log(parentNode + " - " + childNode);
    });
    */

    /*
    findMaxDistance(3, adjacencyList, function (maxDistance) {
        console.log(maxDistance);
    });
    */

    /*
    findNumConnectedComponents(adjacencyList, function (numConnectedComponents) {
        console.log(numConnectedComponents);
    });
    */

    /*
    findGraphDiameter(adjacencyList, function (diameter) {
        console.log(diameter);
    });
    */

    /*
    findHubNodes(adjacencyList);
    */

});

var findNumConnectedComponents = function (adjacencyList, onDoneCallback) {
    "use strict";
    var nodeList = adjacencyList.getNodeList(),
        visited = {},
        numConnectedComponent = 0,
        startNextSearch = function () {
            var nextSrcNode;
            if (nodeList.length === 0) {
                onDoneCallback(numConnectedComponent);
            } else {
                nextSrcNode = nodeList.shift();
                if (!visited[nextSrcNode]) {
                    visited[nextSrcNode] = true;
                    numConnectedComponent += 1;
                }
                doSearch(nextSrcNode);
            }
        },
        doSearch = function (srcNode) {
            dijkstra.search.BreadthFirstSearch.searchWithAdjacencyList(srcNode, adjacencyList, function (parentNode, childNode) {
                visited[childNode] = true;
            }, startNextSearch);
        },
        numNodes = nodeList.length,
        i;

    for (i = 0; i < numNodes; i += 1) {
        console.log(nodeList[i]);
        visited[nodeList[i]] = false;
    }

    startNextSearch();

};

var findMaxDistance = function (srcNode, adjacencyList, onDoneCallback) {
    "use strict";
    dijkstra.search.ShortestPath.findShortestPathWithBFS(srcNode, adjacencyList, function (distance, parentMap) {
        var node,
            maxDistance = -1;
        for (node in distance) {
            if (distance.hasOwnProperty(node)) {
                if (distance[node] > maxDistance) {
                    maxDistance = distance[node];
                }
            }
        }
        onDoneCallback(maxDistance);
    });
};

var findGraphDiameter = function (adjacencyList, onDoneCallback) {
    "use strict";
    var nodeList = adjacencyList.getNodeList(),
        maxDistanceFound = -1,
        findDiameter = function (distanceFound) {
            if (distanceFound > maxDistanceFound) {
                maxDistanceFound = distanceFound;
            }

            if (nodeList.length === 0) {
                onDoneCallback(maxDistanceFound);
            } else {
                findMaxDistance(nodeList.pop(), adjacencyList, findDiameter);
            }
        };
    findDiameter(-1);
};

var findHubNodes = function (adjacencyList) {
    "use strict";

    var adjacencyMap = adjacencyList.getAdjacencyMap(),
        node,
        childCount,
        childrenCountToNodeMap = {},
        childCountList = [],
        sortedChildCountList,
        i,
        topTenCutoff,
        nodeCount = 0,
        hubNodes = "";

    //Count the number of children for each node in the adjacency list.
    for (node in adjacencyMap) {
        if (adjacencyMap.hasOwnProperty(node)) {
            nodeCount += 1;
            childCount = adjacencyList.getChildren(node).length;
            if (!childrenCountToNodeMap.hasOwnProperty(childCount)) {
                childrenCountToNodeMap[childCount] = node;
                childCountList.push(parseInt(childCount, 10));
            }
        }
    }

    sortedChildCountList = childCountList.sort(function (a, b) {
        return a - b;
    });

    topTenCutoff = parseInt(0.10 * nodeCount, 10);

    for (i = 0; i < topTenCutoff; i += 1) {
        hubNodes += childrenCountToNodeMap[sortedChildCountList.pop()] + " ";
    }
    console.log(hubNodes);
};

var findShortestPath = function (srcNode, dstNode, adjacencyList) {
    "use strict";
    dijkstra.search.ShortestPath.findShortestPathWithBFS(srcNode, adjacencyList, function (distance, parentMap) {
        //console.log(distance, parentMap);
        var onNextStepCallback = function (previousNode, currentNode) {
                stack.push(currentNode);
            },
            stack = [],
            stepCount,
            i,
            path = srcNode,
            onDoneCallback = function (sourceReachable) {
                stepCount = stack.length;
                if (sourceReachable) {
                    for (i = 0; i < stepCount; i += 1) {
                        path += " -> " + stack.pop();
                    }
                    console.log(path);
                } else {
                    console.log("Path Unreachable");
                }

            };

        dijkstra.search.ShortestPath.backtrackPath(srcNode, dstNode, parentMap, onNextStepCallback, onDoneCallback);

    });
};
