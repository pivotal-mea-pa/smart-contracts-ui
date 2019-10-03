import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Success extends Component {
  state = {
    regId: "#78398644",
    bid:"1.3m"
    
  };


  render() {
      const {regId, value, bid} = this.state;
    return (
      <div id="step-two">
        <div className="success-message-container">
            <div className="success-message">
                <div className="success-text">
                    Success
                </div>
            </div>
        </div>

        <div className="form-body success">    
           <p>
               Auction Now Open
          </p>                           
        </div>
      </div>
    );
  }
}

export default Success;
