import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { tenderName, blockchainId } = this.props;
    return (
      <div id="step-three">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            You have successfully purchased the tender {tenderName}
            with Blockchain purchase ID #{blockchainId}
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
