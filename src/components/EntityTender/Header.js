import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';

class Header extends Component {
  onGoBack = () => {
    const { role } = this.props;
    window.location.href = `/${role}/dashboard`;
  };

  render() {
    const {
      name,
      status,
      rfpPurchaseEndDate,
      rfpPurchaseStartDate,
      description
    } = this.props.tender;
    return (
      <Fragment>
        <Grid container className="p-2">
          <Grid item sm={6}>
            <Button variant="outlined" color="primary" onClick={this.onGoBack}>
              Back
            </Button>
          </Grid>
          <Grid item sm={6} className="text-right">
            Closing in:{' '}
            <span className="due-date bg-primary text-white py-2 px-1">
              {new Date(rfpPurchaseEndDate).toLocaleDateString('en-gb')}
            </span>
          </Grid>
        </Grid>
        <Grid container className="p-2">
          <Grid item sm={6}>
            <Typography variant="h5">Overview - {name}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Grid>         
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
  role: state.auth.user.role
});

export default connect(mapStateToProps)(Header);
