import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { vendorBlockchainId, tenderBlockchainId } = this.props;
    return (
      <div id="step-two">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            You have awarded Tender {tenderBlockchainId} to Vender{' '}
            {vendorBlockchainId}.
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
