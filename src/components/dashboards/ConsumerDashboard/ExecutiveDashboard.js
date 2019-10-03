import React, { Component } from 'react';

import { Grid } from '@material-ui/core';
import YearReview from '../../../img/charts/entity-timline.svg';
import Pie from '../../../img/charts/entity-pie.svg';
import CategoryChart from '../../../img/charts/entity-bar.svg';

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
          <Grid item sm={12}>
            <div className="chart-container">
              <img src={YearReview} alt="Logo" />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={Pie} alt="Logo" />
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className="chart-container">
              <img src={CategoryChart} alt="Logo" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ExecutiveDashboard;
