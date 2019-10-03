import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTenders } from '../../../redux/actions/tenderActions';
import { getNotifications } from '../../../redux/actions/notificationActions';
import Header from './Header';
import Tenders from './Tenders';

class InternalDashboard extends Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    const { getTenders, getNotifications } = this.props;
    getTenders();
    getNotifications();
  }

  onChange = (e, tabValue) => {
    this.setState({ tabValue });
  };

  render() {
    return (
      <div className="page consumer-dashboard internal">
        <Header />
        <Tenders />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tenderList: state.tenders.tenderList,
  notificationList: state.notifications.notificationList
});

const actions = {
  getTenders,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(InternalDashboard);
