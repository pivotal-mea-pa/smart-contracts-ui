import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { clearCurrentProfile } from '../../redux/actions/profileActions';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import logo from '../../img/logo.svg';

class Header extends Component {
  onLogout = e => {
    const { logoutUser, clearCurrentProfile } = this.props;
    e.preventDefault();
    clearCurrentProfile();
    logoutUser();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <AppBar className="header bg-muted">
        <Toolbar>
          <Link to="/">
            <img src={logo} alt="government.ae" />
          </Link>
          {isAuthenticated && (
            <Button className="btn-right" onClick={this.onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = {
  logoutUser,
  clearCurrentProfile
};

export default connect(
  mapStateToProps,
  actions
)(Header);
