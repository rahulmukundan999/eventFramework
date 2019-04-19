module.exports = express;

function express() {
    var exp = require('express');
    var async = require('async');
    var bodyParser = require('body-parser');
    var fs = require('fs');
    var cors = require('cors')
    var app = exp();
    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // app.use(bodyParser.json());
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    })); // app.use(fileUpload());
    this.startService = startService;

    function startService(conf, cb) {
        app.listen(conf.port, () => {
            console.log(`server running on port ${conf.port}`)
        });
        for (var i = 0; i < conf.urls.length; i++) {
            async.eachSeries(conf.urls, function (url, next) {
                if (url.method == 'get') {
                    app.get(url.url, function (req, res) {
                        url.callback(req, res);
                    });
                } else {
                    if (url.type == "file") {
                        console.log('filefile');
                        app.post(url.url, function (req, res) {
                            url.callback(req, res);
                        });
                    } else {
                        app.post(url.url, function (req, res) {
                            url.callback(req, res);
                        });
                    }
                }
                next();
            }, function done() {
                cb(null);
            });
        }
    }
}