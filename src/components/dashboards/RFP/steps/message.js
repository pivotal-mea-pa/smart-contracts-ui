import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { tenderName } = this.props;
    return (
      <div id="step-two">
        <div className="form-body">
          <div className="form-subtitle">
            <p>
              You are about to purhase a request to compete for tender{' '}
              {tenderName}.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
