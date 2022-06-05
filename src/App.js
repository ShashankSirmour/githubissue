import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import Game from '@views/Game';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/game" component={Game} />
          <Redirect to="/game" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
