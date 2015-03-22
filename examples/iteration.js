var took = require('../took');

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
