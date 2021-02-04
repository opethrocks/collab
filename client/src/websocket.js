let onMessageCallback;
export let send;

// A new Websocket connection is initialized with the server
const url =
  process.env.NODE_ENV === 'production'
    ? `wss://${window.location.host}`
    : 'ws://localhost:5000';

export const connection = new WebSocket(url);

function heartbeat() {
  setTimeout(() => {
    connection.terminate();
  }, 30000 + 1000);
}

export const websocket = () => {
  connection.onopen = () => {
    console.log('Websocket open');
    heartbeat();
  };

  connection.onerror = (error) => {
    console.log(`Websocket error ${error.reason}`);
  };

  connection.onclose = (e) => {
    clearTimeout(heartbeat);
    console.log(`Websocket closed ${(e.code, e.reason)}`);
  };

  connection.onmessage = (e) => {
    if (e.data === 'ping') heartbeat();
    onMessageCallback && onMessageCallback(e.data);
  };
  send = connection.send.bind(connection);
};

export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn;
};
