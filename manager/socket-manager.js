module.exports = socketManager;


function socketManager(conf,fw,cb) {

    const server = require('http').createServer();
    const io = require('socket.io')(server);
    io.on('connection', client => {
        client.on('req', data => {
            // console.log(data);
            var tempRpc = require('./rpc'); 
            tempRpc = new tempRpc(fw, data, conf, tempData =>{
                if(tempData.status == 200) {
                    // console.log('fdf',tempData);
                    tempData['component'](data.data,result => {
                        // console.log(result)
                        result['_reqid'] = data._reqid;
                        client.emit('res',result);
                    });
                } else {
                    client.emit('res',{
                        _reqid : data._reqid,
                        status : 500,
                        msg : 'Invalid Rpc'
                    })
                }
            });
        });
    });
    console.log('Socket Started at port ' + conf.socketPort);
    server.listen(conf.socketPort);
}