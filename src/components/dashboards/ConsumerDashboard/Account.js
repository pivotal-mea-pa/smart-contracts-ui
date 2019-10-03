import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ActivityTimeline from './ActivityTimeline';
import Accountdetails from './AccountDetails';

class Account extends Component {
  render() {
    return (
      <div className="tab-content account">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <span className="tab-content-header-text">Account Details</span>
            </Grid>
            <Grid container className="account-body">
              <Accountdetails />
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <ActivityTimeline />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
