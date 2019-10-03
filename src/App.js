import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import MasterPage from './components/layout/MasterPage';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './MuiTheme/theme';

import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <MasterPage />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
