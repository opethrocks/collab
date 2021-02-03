// We create an exported variable `send`, that we will assign
// later (just know that it is exported for now)
export let send;
export let close;

// The onMessageCallback is also assigned later, as we will soon see
let onMessageCallback;

// This exported function is used to initialize the websocket connection
// to the server
export const startWebsocketConnection = (auth) => {
  //Import state from UserContext to check if user is authenticated
  //before we restart a closed connection

  // A new Websocket connection is initialized with the server
  const ws =
    process.env.NODE_ENV === 'production'
      ? new window.WebSocket('wss://window.location.host/api/messages') || {}
      : new window.WebSocket('ws://localhost:5000/api/messages') || {};

  // If the connection is successfully opened, we log to the console
  ws.onopen = () => {
    console.log('opened ws connection');
  };

  // If the connection is closed, we log that as well, along with
  // the error code and reason for closure
  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason);
    if (auth) startWebsocketConnection();
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
