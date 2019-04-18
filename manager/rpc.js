module.exports = rpc;

function rpc(fw ,data,conf,cb) {
    this.checkRpc = checkRpc;
    checkRpc(data, tempData =>{
        if(tempData.status == 200) {
            cb(tempData);
        } else {
            cb({
                status : 500
            })
        }
    });
    function checkRpc(data,cb) {
        var flag = 0;
        var tempRpc = data.rpc.split('.');
        var component;
        for(var i = 0 ; i < conf.modules.length ; i++) {
            if(tempRpc[0] == conf.modules[i]) {
                var component = require(conf.directory + '/server/'+conf.component+'/' + data.rpc.split('.')[0] + '/server');
                var component = new component(fw)[data.rpc.split('.')[1]];
                if(component == undefined) {
                    console.log('invalid rpc');
                    break;
                } else {
                    flag = 1;
                    break;
                }
            }
        }
        if(flag == 1) {
            // console.log('component',component)
            cb({
                status : 200,
                component : component
            })
        } else {
            cb({
                status : 500,
                msg : 'Inavlid Rpc'
            })
        }
    }
}