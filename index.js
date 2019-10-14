const Hapi = require('hapi');
const mySqlController = require('./controller/mySqlController');
const middleware = require('./controller/middleware');
const envConfig=require('./config/envConfig.json');
const PORT=envConfig[process.env.NODE_ENV || 'development'].node_port;
//init server
const server = new Hapi.Server({port: PORT,host: 'localhost'});

//routes
server.route({method: 'GET',path: '/search',handler: mySqlController.searchUsers});

server.route({method: 'POST',path: '/login',handler: mySqlController.login});

server.route({method: 'POST',path: '/addUser',handler: mySqlController.addUser});

server.route({path: '/delete', method: 'DELETE', handler: mySqlController.deleteUser});



//to bootUpServer
const getUpAndRunning = async () => {
    await server.start();
    console.log(`Server is running at ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

getUpAndRunning();

