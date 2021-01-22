import React, { createContext, useState } from 'react';

const StatusContext = createContext([{}, () => {}]);

const StatusProvider = (props) => {
  const [state, setState] = useState({});

  return (
    <StatusContext.Provider value={[state, setState]}>
      {props.children}
    </StatusContext.Provider>
  );
};

export { StatusContext, StatusProvider };
