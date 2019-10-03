import React, { Component } from 'react';

class Success extends Component {
  render() {
    const { tenderName } = this.props;
    return (
      <div id="step-three">
        <div className="success-message-container">
          <div className="success-message">
            <div className="success-text">Success</div>
          </div>
        </div>

        <div className="form-body success">
          <p>
            You have successfully Submitted the tender {tenderName} for the Higher
            Colleges of Technology to Publish
          </p>
        </div>
      </div>
    );
  }
}

export default Success;
