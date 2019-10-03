import React, { Component } from 'react';
import logo from '../../../img/consumer-logos/hct-logo.svg';
import { Grid } from '@material-ui/core/';
import StarRating from '../../charts/StarRating';
import ProgressChart from '../../charts/ProgressChart';

export default class Header extends Component {
  render() {
    const { tenders } = this.props;
    return (
      <Grid container spacing={8} className="pt-3 header pt-left-20">
        <Grid item sm={3} style={{ marginBottom: '10px' }}>
          <img src={logo} className="vendor-logo" alt="" style={{ maxWidth: '100%' }} />
          
          <StarRating rating={4} />
          <br />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              tenders &&
              tenders.filter(
                tender =>
                  tender.status === 'Pending' || tender.status === 'Open'
              ).length
            }
            total={tenders && tenders.length}
            color="006500"
            title="Active Tenders"
          />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              tenders &&
              tenders.filter(tender => tender.status === 'Awarded').length
            }
            total={tenders && tenders.length}
            color="006500"
            title="Completed Tenders"
          />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              tenders &&
              tenders.filter(tender => tender.status === 'Closed').length
            }
            total={tenders && tenders.length}
            color="006500"
            title="Closed Tenders"
          />
        </Grid>
      </Grid>
    );
  }
}
