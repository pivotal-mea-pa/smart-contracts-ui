import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthModal from '../auth/AuthModal';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';

class LandingPage extends Component {
  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      const { role } = auth.user;
      if (role === 'Internal') {
        history.push('/internal/dashboard');
      }
      if (role === 'Vendor') {
        history.push('/vendor/dashboard');
      }
      if (role === 'Entity') {
        history.push('/entity/dashboard');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.auth.isAuthenticated) {
      const { role } = nextProps.auth.user;
      if (role === 'Internal') {
        history.push('/internal/dashboard');
      }
      if (role === 'Vendor') {
        history.push('/vendor/dashboard');
      }
      if (role === 'Entity') {
        history.push('/entity/dashboard');
      }
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    return (
      <div className="page landing-page eagle-bg">
        <Grid container>
          <Grid item className="flex" sm={8}>
            <Card className="card">
              <CardContent className="text-left padd-40">
                <h2>
                  <span className="card-header-secondary">Smart Contracts</span>
                </h2>
              </CardContent>
              <CardActions className="card-footer">
                <AuthModal />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(LandingPage);
