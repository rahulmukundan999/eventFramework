module.exports = index;

function index(conf) {
    var confObj = {};
    var apiInstances = {};
    confObj.getTimeStamp = getTimeStamp;
    confObj.getApiInstance = getApiInstance;
    confObj.getModule = getModule;
    var obj = require('./manager/startup.js');
    var obj = new obj(conf,confObj,data =>{
        if(data.status == 200) {
            console.log('All Services Started');
        } else {
            console.log('Error');
        }
    })
    function getTimeStamp(option) {
        if (typeof option == "object") {
            var currentDate = new Date();
            if (option.months) {
                currentDate.setMonth(currentDate.getMonth() + option.months);
            } else if (option.days) {
                currentDate.setDate(currentDate.getDate() + option.days);
            }
            return Math.floor(currentDate.getTime() / 1000);
        } else {
            return Math.floor(new Date().getTime() / 1000);
        }
    }

    function getApiInstance(apiName) {
        if (apiInstances[apiName] == undefined) {
            var obj = require('./api/' + apiName);
            apiInstances[apiName] = new obj(confObj);
        }
        return apiInstances[apiName];
    }
    function getModule(name) {
        var temp = require(name);
        return temp;
    }
}