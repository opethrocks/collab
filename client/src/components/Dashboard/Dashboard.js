import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

function Dashboard(props) {
  const [state, setState] = useContext(UserContext);

  //On Component mount make api to api/tokenValidator to
  //validate the auth token, if not authenticated then log user out.
  useEffect(() => {
    axios.post('/api/dashboard').catch((err) => {
      setState({
        ...state,
        authenticated: false,
        status: err.response?.data.msg,
      });
    });
  });

  return (
    <div>
      <h1>{`${state.username}'s dashboard`}</h1>
    </div>
  );
}

export default Dashboard;
