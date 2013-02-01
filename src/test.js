var dijkstra = require("./build/js/dijkstra.js");



dijkstra.parse.AdjacencyListParser().parseAdjacencyList("airtravel.graph", function (adjacencyList) {
    "use strict";


    dijkstra.search.BreadthFirstSearch.searchWithAdjacencyList(4, adjacencyList, function (parentNode, childNode) {
        console.log(parentNode + " - " + childNode);
    });


});
