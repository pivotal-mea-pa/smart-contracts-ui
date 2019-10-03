import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import RegistrationForm from './forms/registrationForm';
import LoginForm from './forms/loginForm';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid } from '@material-ui/core';

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  state = {
    open: false,
    loginView: true,
    RegisterView: false,
    active: true,
    agree: '',
    stepCount: 1,
    ButtonText: 'Cancel',
    value: 0
  };

  handleClose = e => {
    this.setState({ stepCount: 0, value: 0, open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { open, value } = this.state;
    const { handleChangeTab } = this.props;

    return (
      <div>
        <Button
          className="btn-primary"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Join Now
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          className="auth-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <Grid item sm={2}>
              <Tabs
                value={value}
                className="side-tabs"
                onChange={this.handleChangeTab}
              >
                <Tab className="tabs" label="Login" icon={<LockIcon />} />
                <Tab className="tabs" label="Register" icon={<AccountIcon />} />
              </Tabs>
            </Grid>
            <Grid item sm={10}>
              {value === 0 && <LoginForm handleClose={this.handleClose} />}
              {value === 1 && (
                <RegistrationForm
                  handleChangeTab={this.handleChangeTab.bind(this, value)}
                  handleClose={this.handleClose}
                />
              )}
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

export default AuthModal;
