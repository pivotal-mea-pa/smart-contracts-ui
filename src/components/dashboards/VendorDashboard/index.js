import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRFTs } from '../../../redux/actions/rftActions';
import { getNotifications } from '../../../redux/actions/notificationActions';
import { Snackbar, Tab, Tabs } from '@material-ui/core/';
import Header from './Header';
import ActiveTenders from './ActiveTenders';
import ExecutiveDashboard from './ExecutiveDashboard';
import Account from './Account';

class VendorDashboard extends Component {
  state = {
    value: 0,
    invitationMessageOpen: false
  };

  componentDidMount() {
    const { getRFTs, profile, getNotifications } = this.props;
    getRFTs();
    getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profiles) {
      console.log(nextProps.profiles);
    }
  }

  onChange = (e, value) => {
    this.setState({ value });
  };

  onClose = () => {
    this.setState({ invitationMessageOpen: false });
  };

  viewInvitations = () => {
    this.setState({ value: 1, invitationMessageOpen: false });
  };

  render() {
    const { value, invitationMessageOpen } = this.state;
    return (
      <div className="page vendor-dashboard dashboard">
        <Header />
        <Tabs
          value={value}
          onChange={this.onChange}
          className="dashboard-tabs"
          indicatorColor="primary"
        >
          <Tab className="text-capitalize" label="Active" />
          <Tab className="text-capitalize" label="Executive Dashboard" />
          <Tab className="text-capitalize" label="Account" />
        </Tabs>
        {value === 0 && <ActiveTenders />}
        {value === 1 && <ExecutiveDashboard />}
        {value === 2 && <Account />}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={invitationMessageOpen}
          onClose={this.onClose}
          className="notification"
          message={<span>3 New Invitations</span>}
          action={[
            <span className="text-primary" onClick={this.viewInvitations}>
              View
            </span>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rftList: state.rfts.rftList,
  profile: state.profiles.profile
});

const actions = {
  getRFTs,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(VendorDashboard);
