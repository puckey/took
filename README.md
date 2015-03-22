# took

  Easily log how long your function took to call back: wrap it in a took!

## Installation

    $ npm install took

### One liner callback timing
```javascript
fs.readFile('/etc/passwd', took('Reading /etc/passwd', function (err, data) {
  // Do something with the data
}));

// Will log: Reading /etc/passwd took 00:00.001
```

### To time synchronous code, call took twice with the same id
```javascript   
took('My for loop');
for (var i = 0; i < 1000000000; i++) {
  Math.random();
} 
took('My for loop');

// Will log: My for loop took 00:00.531
```

### Use took.tick to find out how much time your code took per iteration
```javascript
function slowlyAddTillTen(callback) {
	var count = 0;
	function addOne() {
		if (count++ < 10) {
			setTimeout(took.tick('Adding', add), Math.random() * 100);
		} else {
			callback('Done counting');
		}
	}
	addOne();
}

slowlyAddTillTen(took('Adding', function(message) {
	console.log(message) // 'Done counting'
}));

// Will log: Adding took 00:01.039. On average 00:00.103 for 10 iterations at 9.62 per second.
```

### Have the timer wait until the function has been called
```javascript
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
