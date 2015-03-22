# took

  Easily log how long your function took to call back: wrap it in a took!

## Installation

    $ npm install took

### One liner callback timing
```javascript
var took = require('took');

fs.readFile('/etc/passwd', took('Reading /etc/passwd', function (err, data) {
  // Do something with the data
}));

// Will log: Reading /etc/passwd took 00:00.001
```

### To time synchronous code, call took twice with the same id
```javascript   
var took = require('took');

took('My slow for loop');
for (var i = 0; i < 300000000; i++) {
  Math.random();
} 
took('My slow for loop');

// Will log: My slow for loop took 00:02.636
```

### Use took.tick to find out how much time your code took per iteration
```javascript
var took = require('took');

function slowlyAddTillTen(callback) {
	var count = 0;
	function addOne() {
		if (count++ < 10) {
			console.log(count);
			setTimeout(took.tick('Adding', addOne), Math.random() * 1000);
		} else {
			callback('Done counting');
		}
	}
	addOne();
}

slowlyAddTillTen(took('Adding', function(message) {
	console.log(message) // 'Done counting'
}));

// Will log: Adding took 00:04.301. On average 00:00.430 for 10 iterations at 2.33 per second.
```

### Have the timer wait until the function has been called
```javascript
var took = require('took');

var toCall = took.whenCalled('My time-out', function(callback) {
  setTimeout(callback, 1000);
});

setTimeout(function() {
	toCall(function() {
		console.log('Done');
	})
}, 1000);

// Will log: My timeout took 00:01.001
```

## License

  MIT
