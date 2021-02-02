const WebSocket = require('ws');

function wsConnection() {
  function wss() {
    //Web socket server
    const wss = new WebSocket.Server({
      noServer: true,
      autoAcceptConnections: false,
      clientTracking: true
    });
    return wss;
  }

  function handleConnection() {
    //Broadcast messages to all connected clients
    wss.on('connection', function connection(ws) {
      console.log('connected');
      ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    });
    maintainConnection();
  }

  function maintainConnection() {
    function noop() {}

    function heartbeat() {
      this.isAlive = true;
    }

    const wss = wss();

    wss.on('connection', function connection(ws) {
      ws.isAlive = true;
      ws.on('pong', heartbeat);
    });

    const interval = setInterval(function ping() {
      wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(noop);
      }, 10000);

      wss.on('close', function close() {
        clearInterval(interval);
      });
    });
  }
  return { wss, handleConnection };
}

module.exports = wsConnection;
