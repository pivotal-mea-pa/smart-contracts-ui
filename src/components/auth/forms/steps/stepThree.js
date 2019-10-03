import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, FormControl, TextField, MenuItem } from '@material-ui/core/';
import { constructRegistration } from '../../../../redux/actions/authActions';

class StepThree extends Component {
  state = {
    address1: '1 Main Street',
    address2: 'The Village',
    address3: 'The Town',
    country: 'Abi Dhabi',
    postcode: 'A123D12',
    email: '',
    phone: '01-1121234',
    fax: '01-1121235'
  };

  componentWillUnmount() {
    const { constructRegistration, payload } = this.props;
    const {
      address1,
      address2,
      address3,
      country,
      postcode,
      email,
      phone,
      fax
    } = this.state;
    constructRegistration({
      ...payload,
      address1,
      address2,
      address3,
      country,
      postcode,
      email,
      phone,
      fax
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      address1,
      address2,
      address3,
      country,
      postcode,
      email,
      phone,
      fax
    } = this.state;
    return (
      <div id="step-two">
        <div className="form-subtitle">Vender Address Details</div>
        <div className="form-body">
          <TextField
            margin="dense"
            id="address1"
            name="address1"
            value={address1}
            onChange={this.onChange}
            label="Address Line 1: (max 75 characters)*"
            className="secondary"
            fullWidth
          />
          <TextField
            margin="dense"
            id="address2"
            name="address2"
            value={address2}
            onChange={this.onChange}
            label="Address Line 2: (max 75 characters)*"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="address3"
            name="address3"
            value={address3}
            onChange={this.onChange}
            label="Address Line 3: (max 75 characters)*"
            fullWidth
            className="secondary"
          />
          <FormControl fullWidth>
            <Select
              id="country"
              name="country"
              value={country}
              onChange={this.onChange}
              displayEmpty
              className="selected-empty"
            >
              <MenuItem value="">Country</MenuItem>
              <MenuItem value="yes">Abu Dhabi</MenuItem>
            </Select>
            <TextField
              margin="dense"
              id="postcode"
              name="postcode"
              value={postcode}
              onChange={this.onChange}
              label="Postcode/Zip code*"
              className="left-align secondary"
              fullWidth
            />
          </FormControl>
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
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={phone}
            onChange={this.onChange}
            label="Telephone Number*"
            type="phone"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="fax"
            name="fax"
            value={fax}
            onChange={this.onChange}
            label="Fax Number*"
            type="phone"
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
)(StepThree);
