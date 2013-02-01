var dijkstra = require("./../build/js/dijkstra.js");



dijkstra.parse.AdjacencyListParser().parseAdjacencyList("airtravel.graph", function (adjacencyList) {
    "use strict";

    //console.log(adjacencyList.getAdjacencyList());

    /*
    dijkstra.search.BreadthFirstSearch.searchWithAdjacencyList(1, adjacencyList, function (parentNode, childNode) {
        console.log(parentNode + " - " + childNode);
    });
    */

    dijkstra.search.ShortestPath.findShortestPathWithBFS(1, adjacencyList, function (distance, parent) {
        console.log(distance, parent);
    });

});
