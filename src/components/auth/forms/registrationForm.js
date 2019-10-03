import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions';
import { createProfile } from '../../../redux/actions/profileActions';
import RegisterIcon from '@material-ui/icons/PersonOutline';
import StepOne from './steps/stepOne';
import StepTwo from './steps/stepTwo';
import StepThree from './steps/stepThree';
import StepFour from './steps/stepFour';
import StepFive from './steps/stepFive';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Button
} from '@material-ui/core/';
import Loader from '../../common/Loader';
import Success from './success';

class RegisterForm extends Component {
  state = {
    open: false,
    loginView: true,
    RegisterView: false,
    active: true,
    agree: '',
    stepCount: 1,
    maxStep: 5
  };

  handleClose = e => {
    if (this.state.stepCount === 1) {
      this.setState({ open: false, ButtonText: 'Back' });
    } else {
      this.setState({ stepCount: this.state.stepCount - 1 });
    }
  };

  onRegister = e => {
    e.preventDefault();
    const { payload, createProfile, registerUser } = this.props;
    const {
      name,
      municipalityLicenseNumber,
      licenseNumber,
      certificateNumber,
      unifiedNumber,
      blockchainId,
      address1,
      address2,
      address3,
      country,
      postcode,
      email,
      phone,
      fax,
      blockchainCode,
      user
    } = payload;
    registerUser({
      ...user,
      role: 'Vendor',
      password: 'password',
      confirmPassword: 'password'
    }).then(res => {
      createProfile({
        user: res._id,
        name: name,
        type: 'Vendor',
        municipalityLicenseNumber,
        licenseNumber,
        certificateNumber,
        unifiedNumber,
        blockchainId,
        address1,
        address2,
        address3,
        country,
        postcode,
        email,
        phone,
        fax,
        blockchainCode
      });
    });

    this.setState({ stepCount: 6 });
    setTimeout(() => this.setState({ stepCount: 7 }), 3000);
  };

  render() {
    const { stepCount, maxStep } = this.state;
    let step;

    if (stepCount === 1) {
      step = <StepOne />;
    } else if (stepCount === 2) {
      step = <StepTwo />;
    } else if (stepCount === 3) {
      step = <StepThree />;
    } else if (stepCount === 4) {
      step = <StepFour />;
    } else if (stepCount === 5) {
      step = <StepFive />;
    } else if (stepCount === 6) {
      step = <Loader />;
    } else if (stepCount === 7) {
      step = <Success />;  
     
    }

    return (
      <div className="register-dialog">
        <DialogTitle className="dialog-title" id="form-dialog-title">
          Register{' '}
          <span className="register-icon">
            {' '}
            <RegisterIcon />
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="form-step-indecator">
            {stepCount < 6 && (
              <MenuList className="steps">
                <MenuItem className={`step ${stepCount === 1 ? 'active' : ''}`}>
                  <span className="number">1</span>
                </MenuItem>
                <MenuItem className={`step ${stepCount === 2 ? 'active' : ''}`}>
                  <span className="number">2</span>
                </MenuItem>
                <MenuItem className={`step ${stepCount === 3 ? 'active' : ''}`}>
                  <span className="number">3</span>
                </MenuItem>
                <MenuItem className={`step ${stepCount === 4 ? 'active' : ''}`}>
                  <span className="number">4</span>
                </MenuItem>
                <MenuItem className={`step ${stepCount === 5 ? 'active' : ''}`}>
                  <span className="number">5</span>
                </MenuItem>
              </MenuList>
              
            )}
          </div>
          {step}
        </DialogContent>
        <DialogActions className="dialog-actions">
          {stepCount === 1 && (
            <Button
              variant="outlined"
              onClick={this.props.handleClose}
              color="primary"
            >
              Cancel
            </Button>
          )}
          {stepCount > 1 && stepCount < 6 && (
            <Button
              variant="outlined"
              onClick={() => this.setState({ stepCount: stepCount - 1 })}
              color="primary"
            >
              Previous
            </Button>
          )}
          {stepCount < maxStep && (
            <Button
              onClick={() => {
                this.setState({ stepCount: stepCount + 1 });
              }}
              className="btn-primary"
              color="primary"
            >
              Next
            </Button>
          )}
          {stepCount === maxStep && (
            <Button
              onClick={this.onRegister}
              className="btn-primary"
              color="primary"
            >
              Register
            </Button>
          )}
          {stepCount === 7 && (
            <Button
              onClick={() => this.props.handleChangeTab(0)}
              className="btn-primary"
              color="primary"
            >
              Login
            </Button>
          )}
        </DialogActions>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payload: state.auth.newVendorFields.payload
});

const actions = {
  registerUser,
  createProfile
};

export default connect(
  mapStateToProps,
  actions
)(RegisterForm);
