import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../img/vendor-logos/DNS-vender.svg';
import { Grid } from '@material-ui/core/';
import StarRating from '../../charts/StarRating';
import ProgressChart from '../../charts/ProgressChart';

class Header extends Component {
  render() {
    const { rftList, user } = this.props;
    const myRfts = rftList.filter(rft => rft.vendorContact === user.id);
    return (
      <Grid container spacing={8} className="pt-3 header pt-left-20">
        <Grid item sm={3}>
          <img
            src={logo}
            className="vendor-logo"
            alt=""
            style={{ maxWidth: '100%' }}
          />
          <StarRating rating={4} />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              myRfts && myRfts.filter(rft => rft.status === 'Purchased').length
            }
            total={myRfts && myRfts.length}
            color="c6ab6e"
            title="Active Tenders"
          />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              myRfts && myRfts.filter(rft => rft.status === 'Awarded').length
            }
            total={myRfts && myRfts.length}
            color="c6ab6e"
            title="Completed Tenders"
          />
        </Grid>
        <Grid item sm={3}>
          <ProgressChart
            width={100}
            number={
              myRfts && myRfts.filter(rft => rft.status === 'Closed').length
            }
            total={myRfts && myRfts.length}
            color="c6ab6e"
            title="Closed Tenders"
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  rftList: state.rfts.rftList,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Header);
