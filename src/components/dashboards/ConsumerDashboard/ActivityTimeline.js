import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card } from '@material-ui/core/';
import { History } from '@material-ui/icons/';
import getTimeStamp from '../../../utils/getTimeStamp';

class ActivityTimeline extends Component {
  render() {
    const { recentActivityList } = this.props;

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
                        {activity.type === 'Tender Created' && (
                          <span className="data">
                            Tender <strong>{activity.tender.name}</strong> was created by{' '}
                            {activity.createdBy.name}
                          </span>
                        )}
                        {activity.type === 'Tender Submitted' && (
                          <span className="data">
                            Tender <strong>{activity.tender.name}</strong> was submitted for
                            publication by {activity.createdBy.name}
                          </span>
                        )}
                        {activity.type === 'Tender Published' && (
                          <span className="data">
                            Tender <strong>{activity.tender.name}</strong> was published to the
                            blockchain by {activity.createdBy.name}
                          </span>
                        )}
                        {activity.type === 'RFT Purchased' && (
                          <span className="data">
                            {activity.EntityOrVendor.name} have purchased access
                            to tender {activity.tender.name}
                          </span>
                        )}
                        {activity.type === 'RFP Submitted' && (
                          <span className="data">
                            {activity.EntityOrVendor.name} have submitted a
                            response to tender <strong>{activity.tender.name}</strong>
                          </span>
                        )}
                        {activity.type === 'Clarification Submitted' && (
                          <span className="data">
                            Clarifications have been submitted to{' '}
                            <strong>{activity.tender.name}</strong> by{' '}
                            {activity.createdBy.name}
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
  recentActivityList: state.notifications.notificationList
});

export default connect(mapStateToProps)(ActivityTimeline);
