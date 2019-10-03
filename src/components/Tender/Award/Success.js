import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { tender } = this.props;
    return (
      <div id="step-two">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            You have successfully Accepted the tender {tender.name}{' '}
            <span className="blockchain-id">#{tender.blockchainId}.</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
