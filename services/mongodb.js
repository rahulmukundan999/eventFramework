module.exports = mongodb;


function mongodb() {
    this.connectDb = connectDb;
    this.getData = getData;
    this.insert = insert;
    var MongoClient = require('mongodb').MongoClient;
    var ObjectId = require('mongodb').ObjectId;


    function connectDb(dbName, cb) {
        var url = 'mongodb://localhost:27017';
        MongoClient.connect(url, {
                reconnectTries: 5,
                reconnectInterval: 1000 * 5
        },
        function (err, client) {
            console.log(err);
            if (!err) {
                var db = client.db(dbName);
                cb({
                    status : 200,
                    db : db
                });
            } else {
                cb({
                    status: 500,
                    msg: "Unable to get db connection"
                });
            }
        });
    }
    function getData(data,callback) {
        connectDb(data.dbName , tempData =>{
            if(tempData.status == 200) {
                var dataList = [];
                var db = tempData.db;
                if(!data.limit) {
                    data.limit = 0;
                }
                if(!data.skip) {
                    data.skip = 0;
                }
                if(!data.sort) {
                    data.sort = 0;
                }
                if(data.query) {
                    if (data.query.id) {
                        data.query._id = ObjectId(data.query.id);
                        delete data.query.id;
                    }
                }
                var cursor = db.collection(data.tableName).find(data.query, data.options).limit(data.limit).skip(data.skip).sort(data.sort);
                    cursor.each(function (err, doc) {
                        if (doc != null) {
                            dataList.push(doc);
                        } else {
                            callback({
                                status: 200,
                                data: dataList
                            });
                        }
                    });
            } else {
                callback(tempData);
            }
        })
    }
    function insert(data, callback) {
        connectDb(data.dbName, tempData => {
            if(tempData.status == 200) {
                var db = tempData.db;
                db.collection(data.tableName).insertOne(data.value, function (err, result) {
                    if (err) {
                        console.log("Error occured");
                        console.log(err);
                        console.log(data);
                        callback({
                            status: 500,
                            errorCode: err.code
                        })
                    } else {
                        console.log("Inserted a document into the " + data.tableName);
                        callback({
                            status: 200,
                            data: data.value
                        });
                    }
                });
            } else {
                callback(tempData)
            }
        });
    }
}