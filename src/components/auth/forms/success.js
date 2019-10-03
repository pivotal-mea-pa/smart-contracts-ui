import React, { Component } from 'react';
import { connect } from 'react-redux';

class Success extends Component {
  render() {
    const { blockchainCode, user } = this.props.newVendor;
    return (
      <div id="step-two">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            Congratulations for successfully joining UAE Federal Government
            Business Network on the BlockChain.{' '}
          </p>
          <p>
            <span className="blockchain-id">{blockchainCode}</span> is your
            Blockchain ID. Digital Certificate is available on the Account
            Details
          </p>
          <p>
            Your credentials have been sent to{' '}
            <span className="primary">{user.email}</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newVendor: state.auth.newVendorFields.payload
});

export default connect(mapStateToProps)(Success);
