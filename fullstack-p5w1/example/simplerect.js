// var rect = {
//   perimeter: function(x, y) {
//     return (2 * (x + y));
//   },
//   area: function(x, y) {
//     return (x * y);
//   }
// };

// var rect = require('./rectangle-1');
//
// function solveRect(l, b) {
//   console.log("Solving for rectangle with l = " + l + " and b = " + b);
//
//   if (l < 0 || b < 0) {
//     console.log("Rectangle dimensions should be greater than zero:  l = " + l + ",  and b = " + b);
//   } else {
//     console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rect.area(l, b));
//     console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rect.perimeter(l, b));
//   }
// }

var argv = require('yargs')
  .usage('Usage: node $0 --l=[num] --b=[num]')
  .demand(['l', 'b'])
  .argv;


var rect = require('./rectangle-2');

function solveRect(l, b) {
  console.log("Solving for rectangle with l = " + l + " and b = " + b);
  rect(l, b, function(err, rectangle) {
    if (err) {
      console.log(err);
    } else {
      console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.area());
      console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.perimeter());
    }
  });
};

// solveRect(2, 4);
// solveRect(3, 5);
// solveRect(-3, 5);

solveRect(argv.l, argv.b);
