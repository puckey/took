var pad = require('pad-number');

var tooks = {};

function prettyTime(time) {
  var ms = Math.floor(time % 1000);
  var seconds = Math.floor(time % 60000 / 1000);
  var minutes = Math.floor(time % 3600000 / 60000);  
  return pad(minutes, 2) + ":" + pad(seconds, 2) + '.' + pad(ms, 3);
};

function duration(data) {
  return Date.now() - data[1];
}

function end(id) {
  var data = getData(id);
  var total = duration(data);
  var iterations = data[0];
  var message = [id, 'took', prettyTime(total)].join(' ');
  if (iterations > 0) {
    var average = total / iterations;
    var ps = Math.round(1000 / average * 100) / 100;
    message += ['. On average', prettyTime(average), 'for', iterations,
      'iterations at', ps, 'per second.'].join(' ');
  }
  console.log(message);
  tooks[id] = null;
}

function tick(id) {
  getData(id)[0]++
}

function create(id) {
  var data = tooks[id] = [0, Date.now()];
  return data;
}

function getData(id) {
  return tooks[id] || create(id);
}

function createOrEnd(id) {
  if (!tooks[id]) {
    create(id);
  } else {
    end(id);
  }
}

function took(id, callback) {
  if (callback) {
    create(id);
    return function() {
      end(id);
      callback.apply(this, arguments);
    }
  } else {
    createOrEnd(id);
  }
}

took.tick = function(id, callback) {
  if (callback) {
    return function() {
      tick(id);
      callback.apply(this, arguments);
    }
  } else {
    tick(id);
  }
}

took.whenCalled = function(id, func) {
  var that = this;
  return function() {
    var args = Array.prototype.slice.call(arguments);
    // Wrap the callback in a took:
    args.push(took(id, args.pop()));
    func.apply(that, args);
  }
}

module.exports = took;
