function Circle(anOrigin, aRadius) {
    
    this.origin = typeof anOrigin !== 'undefined' ? anOrigin : [ 0, 0 ];
    this.radius = typeof aRadius !== 'undefined' ? aRadius : 1;
    
    this.getRandomPointWithin = function() {
        return this.getRandomPointWithinProper();
    };
    
    this.getRandomPointWithinIncorrect = function() {
        return this.getPointFrom(Math.random() * Math.PI * 2, this.radius * Math.random());
    };
    
    this.getRandomPointWithinBruteForce = function() {
        var point = undefined;
        
        while (typeof point === 'undefined' || !this.containsPoint(point)) {
            point = [ this.origin[0] + (Math.random() * this.radius * (Math.random() < 0.5 ? 1 : -1)), this.origin[1] + (Math.random() * this.radius * (Math.random() < 0.5 ? 1 : -1)) ];
        }
        
        return point;
    };
    
    this.getRandomPointWithinProper = function() {
        return this.getPointFrom(Math.random() * Math.PI * 2, this.radius * Math.sqrt(Math.random()));
    };
    
    this.containsPoint = function(aPoint) {
        return distance(this.origin, aPoint) <= this.radius;
    };
    
    this.getPointFrom = function(theta, distance) {
        return [ this.origin[0] + (Math.sin(theta) * distance), this.origin[1] + (Math.cos(theta) * distance) ];
    };
    
}

function distance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2));
}