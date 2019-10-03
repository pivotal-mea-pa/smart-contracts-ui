import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constructRegistration } from '../../../../redux/actions/authActions';
import uuid from 'uuid';
import { TextField } from '@material-ui/core/';

class StepFour extends Component {
  state = {
    blockchainCode: uuid().substring(0, 10)
  };

  componentWillUnmount() {
    const { constructRegistration, payload } = this.props;
    const { blockchainCode } = this.state;
    constructRegistration({ ...payload, blockchainCode });
  }

  render() {
    const { blockchainCode } = this.state;
    return (
      <div id="step-two">
        <div className="form-subtitle">Payment Details</div>
        <div className="form-body">
          <p>Please find below the Blockchain code for your transaction</p>
          <TextField
            margin="dense"
            id="blockchainCode"
            name="blockchainCode"
            value={blockchainCode}
            label="Blockchain Code"
            className="secondary"
            disabled={true}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payload: state.auth.newVendorFields.payload
});

const actions = {
  constructRegistration
};

export default connect(
  mapStateToProps,
  actions
)(StepFour);
