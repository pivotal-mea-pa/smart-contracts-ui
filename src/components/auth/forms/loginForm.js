import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions';
import { getCurrentProfile } from '../../../redux/actions/profileActions';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core/';

import LockIcon from '@material-ui/icons/Lock';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: '',
    errors: {},
    buffer: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, buffer: false });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { loginUser, getCurrentProfile } = this.props;
    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    this.setState({ buffer: true });
    loginUser(userData).then(() => getCurrentProfile());
  };

  render() {
    const { email, password, errors, buffer } = this.state;
    return (
      <div className="register-dialog">
        <DialogTitle className="dialog-title" id="form-dialog-title">
          Login
          <span className="register-icon">
            {' '}
            <LockIcon />
          </span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={this.onSubmit} className="form-body">
            <TextField
              margin="dense"
              id="email"
              label="Username"
              type="username"
              className="secondary"
              name="email"
              value={email}
              error={errors.email}
              helperText={errors.email}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              value={password}
              helperText={errors.password}
              error={errors.password}
              onChange={this.onChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button
            variant="outlined"
            onClick={this.props.handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.onSubmit}
            className="btn-primary"
            color="primary"
            type="submit"
          >
            {buffer == false && <span>Login</span>}
            {buffer && (
              <span className="spinner">
                <i class="material-icons">cached</i>
              </span>
            )}
          </Button>
        </DialogActions>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profiles.profile
});

const actions = {
  loginUser,
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  actions
)(LoginForm);
