import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import GithubIssue from '@views/GithubIssue';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={GithubIssue} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
