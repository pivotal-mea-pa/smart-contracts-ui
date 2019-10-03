import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import NotificationTimeline from './NotificationTimeline';
import Accountdetails from './AccountDetails';


class Account extends Component {
  render() {
    return (
      <div className="tab-content account">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <span className="tab-content-header-text">Account Details</span>
              <Grid container className="accoount-body">
              <Accountdetails />
            </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <NotificationTimeline />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
