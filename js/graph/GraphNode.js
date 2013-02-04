
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
