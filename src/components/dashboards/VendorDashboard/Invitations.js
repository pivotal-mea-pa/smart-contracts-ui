import React, { Component } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Typography,
  Drawer,
  Button
} from '@material-ui/core/';
import { History, Search } from '@material-ui/icons/';
import StarRating from '../../charts/StarRating';

class Invitations extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    right: false,
    invitationList: [
      {
        id: 1,
        name: 'RFP 1',
        consumerName: 'Consumer Name',
        rating: 4,
        status: 'Accepted'
      },
      {
        id: 2,
        name: 'RFP 2',
        consumerName: 'Consumer Name',
        rating: 4,
        status: 'Pending'
      },
      {
        id: 3,
        name: 'RFP 3',
        consumerName: 'Consumer Name',
        rating: 4,
        status: 'Awarded'
      },
      {
        id: 4,
        name: 'RFP 4',
        consumerName: 'Consumer Name',
        rating: 4,
        status: 'Rejected'
      }
    ],
    recentActivityList: [
      {
        id: 1,
        name: 'Bid 1',
        status: 'Activity reported',
        dayTime: 'Today 2:00pm'
      },
      {
        id: 2,
        name: 'Bid 2',
        status: 'Activity reported',
        dayTime: 'Today 1:00pm'
      },
      {
        id: 3,
        name: 'Bid 1',
        status: 'Activity reported',
        dayTime: 'Today 1:00pm'
      },
      {
        id: 4,
        name: 'Bid 1',
        status: 'Activity reported',
        dayTime: 'Today 12:00pm'
      },
      {
        id: 5,
        name: 'Bid 1',
        status: 'Activity reported',
        dayTime: 'Today 11:00pm'
      }
    ]
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  InvitationDetail = () => {
    const { history } = this.props;
    history.push('/invitation');
  };

  toggleDrawer = (side, open) => () => {
    console.log('open drawer');
    this.setState({ [side]: open });
  };

  purchaseRFP = () => {
    const sucessBody = document.querySelector('.drawer-body');
    console.log('purchase', sucessBody);
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      invitationList,
      recentActivityList
    } = this.state;
    return (
      <div>
        <div className="tab-content">
          <Grid container spacing={8}>
            <Grid item sm={6}>
              <Grid container className="tab-content-header">
                <Grid item sm={3}>
                  <span className="tab-content-header-text">Invitations</span>
                </Grid>
                <Grid item sm={9}>
                  <FormControl className="active-filters-form-control">
                    <InputLabel htmlFor="dateSorting">Date</InputLabel>
                    <Select
                      value={dateSorting}
                      onChange={this.onChange}
                      inputProps={{
                        name: 'dateSorting',
                        id: 'dateSorting'
                      }}
                    >
                      <MenuItem value="acending">Acending</MenuItem>
                      <MenuItem value="decending">Decending</MenuItem>
                    </Select>
                  </FormControl>{' '}
                  <FormControl className="active-filters-form-control">
                    <InputLabel htmlFor="statusFilter">Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={this.onChange}
                      inputProps={{
                        name: 'statusFilter',
                        id: 'statusFilter'
                      }}
                    >
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="awarded">Awarded</MenuItem>
                      <MenuItem value="declined">Declined</MenuItem>
                    </Select>
                  </FormControl>{' '}
                  <FormControl className="active-filters-form-control">
                    <InputLabel htmlFor="filterType">A-Z</InputLabel>
                    <Select
                      value={filterType}
                      onChange={this.onChange}
                      inputProps={{
                        name: 'filterType',
                        id: 'filterType'
                      }}
                    >
                      <MenuItem value="a-z">A-Z</MenuItem>
                      <MenuItem value="status">Status</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                  </FormControl>
                  <Search className="active-search" />
                </Grid>
              </Grid>
              <Grid container className="tab-card-list tenders">
                {invitationList.map(invitation => {
                  return (
                    <Card
                      className="tab-card"
                      key={invitation.id}
                      onClick={this.toggleDrawer('right', true)}
                    >
                      <Grid container>
                        <Grid item sm={3}>
                          {invitation.name}
                        </Grid>
                        <Grid item sm={4}>
                          {invitation.consumerName}
                        </Grid>
                        <Grid item sm={3}>
                          <StarRating rating={invitation.rating} />
                        </Grid>
                        <Grid item sm={2} className="text-right">
                          Info
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item sm={6}>
              <Grid container className="tab-content-header">
                <Grid item sm={4}>
                  <span className="tab-content-header-text">Activity</span>
                </Grid>
              </Grid>
              <Grid container className="tab-card-list activities">
                {recentActivityList.map(activity => {
                  return (
                    <Card className="tab-card activity-card" key={activity.id}>
                      <Grid container>
                        <Grid item sm={3}>
                          {activity.name}
                        </Grid>
                        <Grid item sm={6}>
                          {activity.status}
                        </Grid>
                        <Grid item sm={3}>
                          <span
                            className="text-info"
                            style={{
                              display: 'inline-block',
                              minHeight: '20px'
                            }}
                          >
                            <History /> {activity.dayTime}
                          </span>
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
        >
          <div tabIndex={0} role="button" className="drawer-right">
            <div className="drawer-inner">
              <div className="drawer-header">
                <Typography className="title" variant="h5">
                  RFP Invitation
                </Typography>
                <Typography className="sub-title" variant="h5">
                  Consumer Name
                </Typography>
              </div>
              <div className="drawer-body">
                <p>
                  Quis ea voluptate veniam aliquip aliqua. Reprehenderit
                  exercitation ullamco qui veniam consectetur ex laboris sint
                  laborum elit amet id incididunt quis. Ex Lorem ex est ipsum
                  esse sunt adipisicing labore tempor. Ea velit cupidatat
                  laboris anim culpa Lorem reprehenderit et officia dolor dolore
                  exercitation.
                </p>
                <p>
                  Quis ea voluptate veniam aliquip aliqua. Reprehenderit
                  exercitation ullamco qui veniam consectetur ex laboris sint
                  laborum elit amet id incididunt quis. Ex Lorem ex est ipsum
                  esse sunt adipisicing labore tempor. Ea velit cupidatat
                  laboris anim culpa Lorem reprehenderit et officia dolor dolore
                  exercitation.
                </p>
                <p>
                  Quis ea voluptate veniam aliquip aliqua. Reprehenderit
                  exercitation ullamco qui veniam consectetur ex laboris sint
                  laborum elit amet id incididunt quis. Ex Lorem ex est ipsum
                  esse sunt adipisicing labore tempor. Ea velit cupidatat
                  laboris anim culpa Lorem reprehenderit et officia dolor dolore
                  exercitation.
                </p>
              </div>
              <div className="drawer-footer">
                <div className="cta-actions left">
                  <Button
                    onClick={this.toggleDrawer('right', false)}
                    variant="outlined"
                    color="secondary"
                  >
                    Decline
                  </Button>
                </div>
                <div className="cta-actions right">
                  <Button
                    variant="contained"
                    className="btn-secondary"
                    color="secondary"
                    onClick={this.purchaseRFP}
                  >
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Invitations;
