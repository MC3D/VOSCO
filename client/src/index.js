import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, DefaultRoute, Redirect, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Items from './components/items';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if token exists, consider user logged in
if (token) {
// update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/signin"/>
      <Route path="/" component={App}>
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="items" component={RequireAuth(Items)} />
        <Route path="welcome" component={RequireAuth(Welcome)} />
        <Redirect path='*' to="/signin" />
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.container-fluid'));
