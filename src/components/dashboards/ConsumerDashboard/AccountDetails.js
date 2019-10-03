import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import Cert from '../../../img/cert.png';

class AccountDetails extends Component {
  render() {
    const { name, blockchainId } = this.props.profile;

    return (
      <div className="account-details">
        <Grid container>
          <Grid item sm={8}>
            <TextField
              id="outlined-name"
              label="Vendor Name"
              className="stack"
              value={name}
              margin="normal"
              variant="outlined"
              disabled
            />
            <TextField
              id="outlined-name"
              label="Blockchain ID"
              className="stack"
              value={blockchainId}
              margin="normal"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item sm={4}>
            <div className="sub-title">Digital Certification</div>
            <div className="cert-container">
              <img src={Cert} alt="Logo" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profiles.profile
});

export default connect(mapStateToProps)(AccountDetails);
