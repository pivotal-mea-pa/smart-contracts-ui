import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constructRegistration } from '../../../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import { Select, FormControl, TextField, MenuItem } from '@material-ui/core/';
import uuid from 'uuid';

class StepOne extends Component {
  state = {
    agree: '',
    name: '',
    licenseNumber: 'LIC001',
    blockchainId: uuid().substring(0, 10),
    rating: 0,
    municipalityLicenseNumber: 'MLN001',
    licenseNumber: 'LN001',
    certificateNumber: 'CERT123456',
    unifiedNumber: 'UNI1'
  };

  componentWillUnmount() {
    const { constructRegistration } = this.props;
    const {
      name,
      municipalityLicenseNumber,
      licenseNumber,
      certificateNumber,
      unifiedNumber,
      blockchainId
    } = this.state;
    constructRegistration({
      name,
      municipalityLicenseNumber,
      licenseNumber,
      certificateNumber,
      unifiedNumber,
      blockchainId
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      agree,
      name,
      municipalityLicenseNumber,
      licenseNumber,
      certificateNumber,
      unifiedNumber,
      blockchainId
    } = this.state;
    return (
      <div id="step-one">
        <p>
          Fill this information in order, do not skip sections unless the fields
          are marked optional. For any queries or assistant with the form,
          please contact <Link to={'/'}>vendorcreation@hct.ac.ae</Link>
        </p>
        <div className="form-subtitle">Declaration</div>
        <div className="terms-container">
          <p>
            I confirm that I am the authorized representative of the
            Contractor/Vendor and the information provided in this form Will be
            true and accurate to the best of my knowledge.
          </p>
          <span className="terms-agree">
            <FormControl>
              <Select
                id="agree"
                name="agree"
                value={agree}
                onChange={this.onChange}
                displayEmpty
                className="selected-empty"
                fullWidth
              >
                <MenuItem value="">yes / no ?</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </span>
        </div>
        <div className="form-body">
          <div className="form-subtitle">Vender Details</div>
          <TextField
            margin="dense"
            id="name"
            name="name"
            value={name}
            onChange={this.onChange}
            label="Enter Company/Trading Name*"
            className="secondary"
            fullWidth
          />
          <TextField
            margin="dense"
            id="municipalityLicenseNumber"
            name="municipalityLicenseNumber"
            value={municipalityLicenseNumber}
            onChange={this.onChange}
            label="Enter Trade/Municipality License Number * (as per Commercial License)"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="licenseNumber"
            name="licenseNumber"
            onChange={this.onChange}
            value={licenseNumber}
            label="Enter License Number * (as per Chamber of Commerce and Industry)"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="certificateNumber"
            name="certificateNumber"
            value={certificateNumber}
            onChange={this.onChange}
            label="Enter Certificate Number * (as per Chamber of Commerce and Industry)"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="unifiedNumber"
            name="unifiedNumber"
            value={unifiedNumber}
            onChange={this.onChange}
            label="Unified Number*"
            fullWidth
            className="secondary"
          />
          <TextField
            margin="dense"
            id="blockchainId"
            name="blockchainId"
            value={blockchainId}
            onChange={this.onChange}
            label="Blockchain ID"
            fullWidth
            disabled={true}
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
)(StepOne);
