var took = require('../took');

took('My slow for loop');
for (var i = 0; i < 300000000; i++) {
  Math.random();
} 
took('My slow for loop');
