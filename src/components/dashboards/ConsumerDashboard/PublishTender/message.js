import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Message extends Component {
  state = {
    regId: "#78398644"
  };

  render() {
      const {regId} = this.state;
    return (
      <div id="step-two">        
        <div className="form-body">
            <div className="form-subtitle">
            <p>You are about to publish your selected RFP to UAE government business network based on blockchain. 

A hash Code will be assigned the tender once published</p>

            </div>                                      
        </div>             
      </div>
    );
  }
}

export default Message;
