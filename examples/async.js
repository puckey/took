var took = require('../took');
var fs = require('fs');

fs.readFile('/etc/passwd', took('Reading /etc/passwd', function (err, data) {
  // Do something with the data
}));
