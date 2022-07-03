import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import CurriculumDesigner from '@views/CurriculumDesigner';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={CurriculumDesigner} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
