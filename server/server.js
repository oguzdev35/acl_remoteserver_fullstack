import config from '../config/config';
import app from './express';
import http from 'http';
import db from './mongoose';

// MongoDB connector
db.connect(config.dbUri);

// Some cloud platforms support http2 automatically even we
// choose our app's protocol as http1. But according to needs, 
// from there we can easily change our protocol preference for
// http2. We can implement http2 without trouble.
const httpServer = http.createServer(app);
// httpServer is net.Server object which is EventEmitter.

httpServer.on('connection', connection => {
  // connection is a net.Server object this means that we
  // can make concurrent server based on one-socket-per-client
  // architecture. But we use iterative server design for this
  // project. Nodejs's event loop mechanism make this possible
  // for production.
  if(connection) {
    const { remoteAddress, remotePort } = connection;
    console.info(`A client connected - ${remoteAddress} - ${remotePort}`);
  }
})

httpServer.on('close', () => {
  console.info('Httpserver closed.');
});

httpServer.on('error', err => {
  console.error(`Error Message: ${err.message}`); // ??? this code will be modified
});

httpServer.listen(config.port, () => {
  console.info(`Http server started on port ${config.port}`);
});

