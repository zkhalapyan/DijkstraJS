
var dijkstra = require("./../../build/js/dijkstra.js");

var adjacencyList = dijkstra.graph.AdjacencyList();



var checkSAT2 = function (adjacencyList, onDoneCallback) {
    "use strict";
    //console.log(adjacencyList.getAdjacencyMap());


    dijkstra.search.StronglyConnectedComponentSearch.search(adjacencyList, function (isConnected) {
        console.log(isConnected);
    });
};


dijkstra.parse.FileLineReader.startRead("test_circuit6.csv", function (fileLine) {
    "use strict";
    var colonSplit,
        a,
        b,
        adjacentNodes;

    colonSplit = fileLine.split(/[\s]*,[\s]*/);
    a = colonSplit.shift();
    b = colonSplit.shift();

    adjacencyList.addEdge(-a, b);
    adjacencyList.addEdge(-b, a);


}, function () {
    "use strict";
    checkSAT2(adjacencyList);
});
