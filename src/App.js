import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import NotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/Login'></Redirect>
        </Route>
        <Route path='/Login'>
          <Login />
        </Route>
        <Route path='/Task'>
          <Tasks />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
