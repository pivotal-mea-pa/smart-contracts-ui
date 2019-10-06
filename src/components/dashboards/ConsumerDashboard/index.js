import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profileActions';
import { getTenders } from '../../../redux/actions/tenderActions';
import { getRFTs } from '../../../redux/actions/rftActions';
import { getNotifications } from '../../../redux/actions/notificationActions';
import { Tab, Tabs } from '@material-ui/core';
import Header from './Header';
import Tenders from './Tenders';
import Account from './Account';
import ExecutiveDashboard from './ExecutiveDashboard';

class ConsumerDashboard extends Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    const {
      getCurrentProfile,
      getTenders,
      getRFTs,
      getNotifications
    } = this.props;
    getCurrentProfile();
    getTenders();
    getRFTs();
    getNotifications();
  }

  onChange = (e, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    const { tabValue } = this.state;
    const { tenderList } = this.props;
    return (
      <div className="page consumer-dashboard">
        <Header tenders={tenderList} />
        <Tabs
          value={tabValue}
          onChange={this.onChange}
          indicatorColor="primary"
          className="dashboard-tabs"
        >
          <Tab className="text-capitalize" label="Active" />
          <Tab className="text-capitalize" label="Executive Dashboard" />
          <Tab className="text-capitalize" label="Account" />
        </Tabs>
        {tabValue === 0 && <TendersGitex />}
        {tabValue === 1 && <ExecutiveDashboard />}
        {tabValue === 2 && <Account />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tenderList: state.tenders.tenderList,
  rftList: state.rfts.rftList
});

const actions = {
  getCurrentProfile,
  getTenders,
  getRFTs,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(ConsumerDashboard);
