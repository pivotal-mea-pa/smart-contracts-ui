import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { tenderName, tenderId } = this.props;
    return (
      <div id="step-three">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            You have successfully published the tender {tenderName} to the
            blockchain network with the blockchain ID{' '}
            <span className="block-color primary">#{tenderId}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
