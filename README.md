DijkstraJS
==========

DijkstraJS is an open-source, JavaScript based graph traversal and manipulation library built using Node.js. 


## Writing Custom Parsers

The idea behind a custom parsers is to read a file line-by-line and initialize an *AdjacencyList* that can be used in graph traversal and search. To start off, we are going to create an empty *AdjacencyList* object, use *FileLineReader*, and write the function that processes a file line and adds edges accordingly. See below example that parses a file that represents a graph in **"srcNode -> childNode0, childNode1"** format:

```JavaScript

(function () {
  
  var dijkstra = require("./build/js/dijkstra.js");
  
  var adjacencyList = dijkstra.graph.AdjacencyList();
  
  //Read the file line by line and add edges to the adjacency list. 
  dijkstra.parse.FileLineReader.startRead("filename.custom", function (fileLine) {
      var lineSplit,
          node,
          adjacentNodes;
  
      lineSplit = fileLine.split(/[\s]->[\s]*/);
      
      node = lineSplit[0];
      adjacentNodes = lineSplit[1].split(/[\s],[\s]*/);

      adjacencyList.addEdges(node, adjacentNodes);
  
  }, 
  
  //Callback invoked when the file is completely read. 
  function () {
      console.log(adjacencyList);
  });
  
}());

```
