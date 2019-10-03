import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';

class Header extends Component {
  onGoBack = e => {
    const { history } = this.props;
    const { role } = this.props.auth.user;
    history.push(`/${role}/dashboard`);
  };
  render() {
    const {
      name,
      rfpResponseEndDate,
      rfpPurchaseStartDate,
      status,
      description
    } = this.props.tender;
    return (
      <Fragment>
        <Grid container className="p-2">
          <Grid item sm={6}>
            <Button
              className="outlined internal"
              variant="outlined"
              color="internal"
              onClick={this.onGoBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item sm={6} className="text-right">
            Closing in:{' '}
            <span className="due-date bg-internal text-white py-2 px-1">
              {new Date(rfpResponseEndDate).toLocaleDateString('en-gb')}
            </span>
          </Grid>
        </Grid>
        <Grid container className="p-2">
          <Grid item sm={6}>
            <Typography variant="h5">Overview - {name}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Grid>
          <Grid item sm={6} className="text-right" />
        </Grid>
        <Grid container className="tender-summary text-center mt-4">
          <Grid item sm={12} className="tender-details">
            <ul className="inline">
              <li>
                <div className="summary-title">Status</div>
                <div className="summary-detail">{status}</div>
              </li>
              <li>
                <div className="summary-title">Tender ID</div>
                <div className="summary-detail">{name}</div>
              </li>
              <li>
                <div className="summary-title">Date Created</div>
                <div className="summary-detail">
                  {new Date(rfpPurchaseStartDate).toLocaleDateString('en-gb')}
                </div>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tender: state.tenders.tender,
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
