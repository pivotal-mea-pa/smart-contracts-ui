import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class CloseAuction extends Component {
  render() {     
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
               Auction Now Closed
          </p>                           
        </div>
      </div>
    );
  }
}

export default CloseAuction;
