module.exports = startup

function startup(conf, fw, cb) {
    var async = require('async')
    async.waterfall([
        function (callback) {
            var socketManager = require('./socket-manager');
            var socketManager = new socketManager(conf, fw);
            callback()
        },
        function (callback) {
            var start = require(conf.directory + '/eventServer/' + conf.component + '/startup.js');
            start = new start(fw, callback);
        },
        function (callback) {
            cb({
                status: 200
            })
        }
    ])
}