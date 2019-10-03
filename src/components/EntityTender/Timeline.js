import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, Card } from '@material-ui/core';
import getTimeStamp from '../../utils/getTimeStamp';
import StarRating from '../charts/StarRating';

class Timeline extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };
  render() {
    const { tender, notificationList } = this.props;
    const recentActivityList = notificationList.filter(
      notification => notification.tender._id === tender._id
    );
    return (
      <Fragment>
        <Typography variant="h5">Timeline</Typography>

        <br />
        <Grid container className="tab-card-list activities">
          {recentActivityList.slice(0).reverse().map(activity => {
            return (
              <Grid item sm={12} key={activity._id}>
                <Card
                  className={`tab-card activity-card ${
                    activity.type.includes('Tender') ? 'tender' : 'bid'
                  }`}
                >
                  <div className="card-header">
                    <span className="activity-type">Update</span>
                    <span className="activity-timestamp">
                      {' '}
                      {getTimeStamp(activity.createdDate)}
                    </span>
                  </div>
                  <div className="card-body">
                    <span className="consumer-name">
                      {activity.EntityOrVendor && activity.EntityOrVendor.name || activity.type}
                    </span>
                  </div>
                  <div className="card-footer">
                    {activity.rfp ? activity.rfp.bidValue : ''}
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tender: state.tenders.tender,
  notificationList: state.notifications.notificationList
});

export default connect(mapStateToProps)(Timeline);
