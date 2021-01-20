import React, { createContext, useState } from 'react';

//Create UserContext to handle credential input from login and register components.
//Also handle errors from server pertaining to those components.
//We then use those inputs to make api calls to the server for authentication.

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({});

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
