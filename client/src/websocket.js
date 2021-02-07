let onMessageCallback;
export let send;

// A new Websocket connection is initialized with the server
const url =
  process.env.NODE_ENV === 'production'
    ? `wss://${window.location.host}`
    : 'ws://localhost:5000';

const ws = new WebSocket(url);

export const websocket = () => {
  ws.onopen = () => {
    console.log('Websocket open');
  };

  ws.onerror = (error) => {
    console.log(`Websocket error ${error.reason}`);
  };

  ws.onclose = (e) => {
    console.log(`Websocket closed ${(e.code, e.reason)}`);
  };

  ws.onmessage = (e) => {
    onMessageCallback && onMessageCallback(e.data);
  };
  send = ws.send.bind(ws);
};

export const readyState = ws.readyState;

export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn;
};
