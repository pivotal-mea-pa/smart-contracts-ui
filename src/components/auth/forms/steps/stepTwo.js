import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constructRegistration } from '../../../../redux/actions/authActions';
import { TextField } from '@material-ui/core';

class StepTwo extends Component {
  state = {
    name: 'Test Vendor User',
    position: 'Manager',
    phone: '01-0101023',
    email: ''
  };

  componentWillUnmount() {
    const { constructRegistration, payload } = this.props;
    const { name, position, phone, email } = this.state;
    constructRegistration({
      ...payload,
      user: {
        name,
        position,
        phone,
        email
      }
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, position, phone, email } = this.state;
    return (
      <div id="step-two">
        <div className="form-subtitle">Vender Contact Details</div>
        <div className="form-body">
          <p>
            Please provide your details so we can contact you if further
            information is required
          </p>
          <TextField
            margin="dense"
            id="name"
            name="name"
            value={name}
            onChange={this.onChange}
            label="Full Name: (max 60 characters)*"
            className="secondary"
            fullWidth
          />
          <TextField
            margin="dense"
            id="position"
            name="position"
            value={position}
            onChange={this.onChange}
            label="Position Title/Description *:"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={phone}
            onChange={this.onChange}
            label="Phone*: (numbers only, include Area Code)"
            type="phone"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            value={email}
            onChange={this.onChange}
            label="Email Address*"
            type="email"
            fullWidth
            className="secondary"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payload: state.auth.newVendorFields.payload
});

const actions = {
  constructRegistration
};

export default connect(
  mapStateToProps,
  actions
)(StepTwo);
