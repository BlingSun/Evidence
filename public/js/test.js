/**
 * Created by SDH on 2017/8/11.
 */
var async = require('async');

//tasks传的是一个数组函数
async.series([
    function(callback) {
        console.log("function1...");
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        console.log("function2...");
        // do some more stuff ...
        callback(null, 'two');
    }
])
// optional callback