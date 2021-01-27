// The server host is determined based on the mode
// If the app is running in development mode (using npm start)
// then we set the host to "localhost:8080"
// If the app is in production mode (using npm run build)
// then the host is the current browser host
const host =
  process.env.NODE_ENV === 'production'
    ? window.location.host
    : 'localhost:5000';

// We create an exported variable `send`, that we will assign
// later (just know that it is exported for now)
export let send;
export let close;
// The onMessageCallback is also assigned later, as we will soon see
let onMessageCallback;

// This exported function is used to initialize the websocket connection
// to the server
export const startWebsocketConnection = () => {
  // A new Websocket connection is initialized with the server
  const ws = new window.WebSocket('ws://' + host + '/api/messages') || {};

  // If the connection is successfully opened, we log to the console
  ws.onopen = () => {
    console.log('opened ws connection');
  };

  // If the connection is closed, we log that as well, along with
  // the error code and reason for closure
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
  };

  // This callback is called everytime a message is received.
  ws.onmessage = (e) => {
    // The onMessageCallback function is called with the message
    // data as the argument
    onMessageCallback && onMessageCallback(e.data);
  };

  // We assign the send method of the connection to the exported
  // send variable that we defined earlier
  send = ws.send.bind(ws);
  close = ws.close.bind(ws);
};

// This function is called by our React application to register a callback
// that needs to be called everytime a new message is received
export const registerOnMessageCallback = (fn) => {
  // The callback function is supplied as an argument and assigned to the
  // `onMessageCallback` variable we declared earlier
  onMessageCallback = fn;
};
