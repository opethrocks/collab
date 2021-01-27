import React, { createContext, useState } from 'react';

const MessageContext = createContext([{}, () => {}]);

const MessageProvider = (props) => {
  const [msgState, setMsgState] = useState({ messages: [], outgoing: [] });

  return (
    <MessageContext.Provider value={[msgState, setMsgState]}>
      {props.children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
