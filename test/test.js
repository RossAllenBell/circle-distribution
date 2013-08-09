function decEqual(actual, expected, tolerance) {
    ok(Math.abs(actual - expected) <= tolerance, 'Expected [' + expected + '], within tolerance [' + tolerance + '], but got [' + actual + ']');
}

function decsEqual(actual, expected, tolerance) {
    actual.forEach(function(item, i) {
        decEqual(item, expected[i], tolerance);
    });
}

test("calculating distances between points", function() {
    equal(distance([ 0, 0 ], [ 0, 0 ]), 0);
    equal(distance([ 0, 0 ], [ 1, 0 ]), 1);
    equal(distance([ 0, 0 ], [ -1, 0 ]), 1);
    equal(distance([ -1, 0 ], [ 1, 0 ]), 2);
    decEqual(distance([ 0, 0 ], [ 1, 1 ]), 1.4142, 0.0001);
    decEqual(distance([ -1, -1 ], [ 1, 1 ]), 2.8284, 0.0001);
});

test("circle default constructor args", function() {
    var circle = new Circle();
    
    equal(circle.radius, 1);
    deepEqual(circle.origin, [0,0]);
    
    var circle = new Circle([1,2]);
    
    equal(circle.radius, 1);
    deepEqual(circle.origin, [1,2]);
    
    var circle = new Circle(undefined, 3);
    
    equal(circle.radius, 3);
    deepEqual(circle.origin, [0,0]);
    
    var circle = new Circle([4,5],6);
    
    equal(circle.radius, 6);
    deepEqual(circle.origin, [4,5]);
});

test("circle contains point", function() {
    var circle = new Circle([ 0, 0 ], 1);
    
    equal(circle.containsPoint([ 0, 0 ]), true);
    equal(circle.containsPoint([ 1, 0 ]), true);
    equal(circle.containsPoint([ 0, 1 ]), true);
    equal(circle.containsPoint([ -1, 0 ]), true);
    equal(circle.containsPoint([ 0, -1 ]), true);
    equal(circle.containsPoint([ 0.5, 0 ]), true);
    equal(circle.containsPoint([ 1, 1 ]), false);
    equal(circle.containsPoint([ -1, 1 ]), false);
    equal(circle.containsPoint([ 1, -1 ]), false);
    equal(circle.containsPoint([ -1, -1 ]), false);
    
    var circle = new Circle([ 0, 0 ], 0);
    
    equal(circle.containsPoint([ 0, 0 ]), true);
    equal(circle.containsPoint([ 0.001, 0 ]), false);
});

test("circle can find point at theta and distance", function() {
    var circle = new Circle([ 0, 0 ], 1);
    
    decsEqual(circle.getPointFrom(0, 1), [0,1], 0.0001);
    decsEqual(circle.getPointFrom(Math.PI * 2, 1), [0,1], 0.0001);
    decsEqual(circle.getPointFrom(-Math.PI * 2, 1), [0,1], 0.0001);
    decsEqual(circle.getPointFrom(Math.PI * 2 * 0.5, 1), [0,-1], 0.0001);
    decsEqual(circle.getPointFrom(Math.PI * 2 * 0.25, 1), [1,0], 0.0001);
});

test("circle can generate a random point within using incorrect distribution", function() {
    var circle = new Circle([ 11, 12 ], 5);
    var distances = [];

    for (var i=0; i<1000; i++) {
    	distances.push(distance(circle.origin, circle.getRandomPointWithinIncorrect()));
    }
    
    decEqual(distances.reduce(function(prev, curr) {
    	return prev + curr;
    }, 0) / distances.length, circle.radius * 0.5, circle.radius * 0.05);
});

test("circle can generate a random point within using incorrect distribution", function() {
    var circle = new Circle([ 11, 12 ], 5);
    var distances = [];

    for (var i=0; i<1000; i++) {
    	distances.push(distance(circle.origin, circle.getRandomPointWithinBruteForce()));
    }
    
    decEqual(distances.reduce(function(prev, curr) {
    	return prev + curr;
    }, 0) / distances.length, circle.radius * Math.sqrt(0.5), circle.radius * 0.05);
});

test("circle can generate a random point within using incorrect distribution", function() {
    var circle = new Circle([ 11, 12 ], 5);
    var distances = [];

    for (var i=0; i<1000; i++) {
    	distances.push(distance(circle.origin, circle.getRandomPointWithinProper()));
    }
    
    decEqual(distances.reduce(function(prev, curr) {
    	return prev + curr;
    }, 0) / distances.length, circle.radius * Math.sqrt(0.5), circle.radius * 0.05);
});