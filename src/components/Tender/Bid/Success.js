import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { blockchainId, bidAmount } = this.props;
    return (
      <div id="step-two">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            <span className="blockchain-id">{blockchainId}</span> You have
            successfully entered a bid of {bidAmount}.
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
