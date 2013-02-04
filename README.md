DijkstraJS
==========

DijkstraJS is an open-source, JavaScript based graph traversal and manipulation library built using [Node.js](http://nodejs.org/). 

## Using DijkstraJS in Your Project
It's very simple to integrate your application with DijkstraJS. Just git clone the project from https://github.com/zkhalapyan/DijkstraJS.git, copy [build/js/dijkstra.js](https://github.com/zkhalapyan/DijkstraJS/blob/master/build/js/dijkstra.js) to your project, and use `var dijkstra = require("./path/to/dijkstra.js");` to import the module. If you modify the source to adapt to your project, you can build a new version by invoking *ant run* from project root and the contents of *js* folder will be compiled, linted, and optimized to produce the build files.  


## Example Breadth-First Search
The below sample code parses a graph represented in a CSV format and outputs *parent->child node* every time an edge is visited.

```JavaScript
(function () {
  "use strict";
  
  var dijkstra = require("./build/js/dijkstra.js"),
      BFS = dijkstra.search.BreadthFirstSearch,
      CSVParser = dijkstra.parse.CSVAdjacencyListParser,
      
      //Root node for BFS.
      rootNode = 1,
      
      //Callback invoked every time an edge is visited.
      onVisitCallback = function (parentNode, childNode) {
        console.log("Visiting: " + parentNode + " -> " + childNode);
      },
      
      //Callback invoked once the search is complete.
      onDoneCallback = function () {
        console.log("Search Complete");
      };
      
  CSVParser.parseAdjacencyList("input.csv", function (adjacencyList) {
    BFS.searchWithAdjacencyList(rootNode, adjacencyList, onVisitCallback, onDoneCallback);
  });
  
}());
```

## Writing Custom Parsers

The idea behind a custom parsers is to read a file line-by-line and initialize an *AdjacencyList* that can be used in graph traversal and search. To start off, we are going to create an empty *AdjacencyList* object, use *FileLineReader*, and write the function that processes a file line and adds edges accordingly. See below example that parses a file that represents a graph in **"srcNode -> childNode0, childNode1"** format:

```JavaScript

(function () {

    var dijkstra = require("./build/js/dijkstra.js"),
        adjacencyList = dijkstra.graph.AdjacencyList();

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

    //Callback invoked when the file is completely parsed. 
    function () {
        console.log(adjacencyList);
    });
}());

```

## Building the Project (Optional) 
The [ANT build file](https://github.com/zkhalapyan/DijkstraJS/blob/master/build.xml) contains five different targets summarized below:
  1. **lint**: Runs the individual source files through [jslint4java](http://code.google.com/p/jslint4java/) and fails on any lint issues. 
  2. **concat**: Combines source files in *js* folder into *build.js*. All *package.js* files are concatenated separately and prepended to the output file.
  3. **min**: Runs *build.js* though Google Closure Compiler and on successful compilation, produces *build.min.js*. 
  4. **run**: The target comines the entire cicle in the order of clean->lint->concat->min. 
  5. **clean**: The target removes any artifects produced by the build process. This includes *build.js* and *build.min.js*.

