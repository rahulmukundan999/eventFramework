module.exports = mongo;

function mongo() {
    this.getData = getData;
    this.insert = insert;
    var tempMongo = require('../services/mongodb');
    tempMongo = new tempMongo();


    function getData(data,callback) {
        tempMongo.getData(data,callback);
    }
    function insert(data,callback) {
        tempMongo.insert(data,callback);
    }
}