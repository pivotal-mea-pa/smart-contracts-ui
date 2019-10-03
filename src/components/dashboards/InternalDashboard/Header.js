import React, { Component } from 'react';
import { connect } from 'react-redux';
import shape from '../../../img/charts/internal-background-shape.svg';
import { Grid } from '@material-ui/core/';

class Header extends Component {
  render() {
    return (
      <Grid container spacing={8} className="pt-3 internal-header">
        <Grid item sm={3}>
          <h1>Internal Process</h1>
          <div className="background-image-container">
            <img src={shape} alt="Logo" />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  rftList: state.rfts.rftList
});

export default connect(mapStateToProps)(Header);
