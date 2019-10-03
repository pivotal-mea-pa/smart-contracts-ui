import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import YearReview from '../../../img/charts/year-review-timeline.svg';
import AwardedTenders from '../../../img/charts/awarded-chart.svg';
import AuctionChart from '../../../img/charts/auction-chart.svg';
import TenderReview from '../../../img/charts/tender-review-chart.svg';

class ExecutiveDashboard extends Component {
  render() {
    return (
      <div className="tab-content executive">
        <Grid container spacing={8}>
          <Grid item sm={12}>
            <Grid container className="tab-content-header">
              <span className="tab-content-header-text">
                Executive Dashboard
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={YearReview} alt="Logo" />
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={AwardedTenders} alt="Logo" />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={TenderReview} alt="Logo" />
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={AuctionChart} alt="Logo" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ExecutiveDashboard;
