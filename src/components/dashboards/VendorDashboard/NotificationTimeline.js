import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card } from '@material-ui/core/';
import { History } from '@material-ui/icons/';
import getTimeStamp from '../../../utils/getTimeStamp';

class NotificationTimeline extends Component {
  render() {
    const { notificationList } = this.props;
    const recentActivityList = notificationList.filter(
      notification =>
        notification.type !== 'Tender Submitted' &&
        notification.type !== 'Tender Created'
    );
    return (
      <div className="notifications-container">
        <Grid container className="tab-content-header">
          <Grid item sm={4}>
            <span className="tab-content-header-text">Notifications</span>
          </Grid>
        </Grid>
        <Grid container className="tab-card-list activities">
          <div className="overflow-scroll">
            {recentActivityList.slice(0).reverse().map(activity => {
              return (
                <Card className="tab-card activity-card" key={activity._id}>
                  <Grid container>
                    <ul className="inline">
                      <li>
                        <span className="data name"> {activity.type}</span>
                      </li>
                      <li className="activity-desc">
                        {activity.type === 'Tender Published' && (
                          <span className="data">
                            A new Tender <strong>{activity.tender.name}</strong>{' '}
                            has been published to the blockchain.
                          </span>
                        )}
                        {activity.type === 'RFT Purchased' && (
                          <span className="data">
                            {activity.EntityOrVendor &&
                              `${activity.EntityOrVendor.name} have `}{' '}
                            purchased access to tender {activity.tender.name}
                          </span>
                        )}
                        {activity.type === 'RFP Submitted' && (
                          <span className="data">
                            {activity.EntityOrVendor &&
                              `${activity.EntityOrVendor.name} have `}{' '}
                            submitted a response to tender {activity.tender.name}
                          </span>
                        )}
                        {activity.type === 'Clarification Submitted' && (
                          <span className="data">
                            Clarifications have been submitted to{' '}
                            <strong>{activity.tender.name}</strong>.
                          </span>
                        )}
                      </li>
                      <li>
                        <span className="data time-stamp">
                          <History /> {getTimeStamp(activity.createdDate)}
                        </span>
                      </li>
                    </ul>
                  </Grid>
                </Card>
              );
            })}
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.notifications.notificationList
});

export default connect(mapStateToProps)(NotificationTimeline);
