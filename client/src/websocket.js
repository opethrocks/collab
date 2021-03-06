let onMessageCallback;
export let send;
export let close;

function createWebSocketConnection() {
  // A new Websocket connection is initialized with the server
  const url =
    process.env.NODE_ENV === 'production'
      ? `wss://${window.location.host}`
      : 'ws://localhost:5000';

  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('Websocket open');
  };
  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  };
  ws.onerror = (event) => {
    console.log(`Websocket error ${event}`);
  };

  ws.onclose = (e) => {
    console.log(`Websocket closed ${(e.code, e.reason)}`);
  };

  send = ws.send.bind(ws);
  close = ws.close.bind(ws);

  return ws;
}

function registerOnMessageCallback(fn) {
  onMessageCallback = fn;
}

export { createWebSocketConnection, registerOnMessageCallback };
