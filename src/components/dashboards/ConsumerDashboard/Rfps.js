import React, { Component } from 'react';
import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Drawer,
  Button,
  Typography
} from '@material-ui/core';
import { History, Search } from '@material-ui/icons';
import StarRating from '../../charts/StarRating';

class Rfps extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    right: false,
    modalOpen: false,
    rfpList: [],
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

  toggleDrawer = (side, open) => () => {
    console.log('open drawer');
    this.setState({ [side]: open });
  };

  purchaseRFP = () => {
    const sucessBody = document.querySelector('.drawer-body');
    console.log('purchase', sucessBody);
  };

  onOpen = () => {
    this.setState({ modalOpen: true });
  };

  onClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      rfpList,
      recentActivityList,
      right,
      modalOpen
    } = this.state;
    return (
      <div className="tab-content">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.onClose}
        >
          <div className="modal">
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
              odit iure dignissimos voluptates pariatur, temporibus at quod ea
              quidem illum voluptatem, culpa impedit adipisci dolorum
              repellendus nemo! Voluptate voluptatibus excepturi neque
              distinctio ea soluta at odio eveniet eaque laborum earum minima
              doloremque similique, vel harum? Ullam provident eos praesentium
              tempore, ut et! Earum consequatur culpa optio repellendus sunt
              dignissimos sint, nam eum minus deserunt, ea velit, perferendis
              doloremque tenetur quis a sit provident quo suscipit animi
              laudantium. Pariatur laudantium debitis a iusto nisi laborum, ad
              doloremque rerum explicabo unde reprehenderit voluptates
              voluptatibus, impedit nihil ipsam autem magni? Totam, tenetur
              modi.
            </Typography>
          </div>
        </Modal>
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Grid container className="tab-content-header">
              <Grid item sm={3}>
                <span className="tab-content-header-text">Submitted RFP</span>
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
              {rfpList.map(rfp => {
                return (
                  <Card
                    className="tab-card"
                    key={rfp.id}
                    onClick={this.toggleDrawer('right', true)}
                  >
                    <Grid container>
                    <ul className="inline">
                        <li>
                        <span className="item-data">{rfp.vendorName}</span>
                          </li>
                          {/* <li>
                        <span className="item-data">{rfp.name}</span>
                          </li> */}
                          <li>
                        <span className="item-data">category</span>
                          </li>
                          <li>
                        <span className="item-data">Due Date</span>
                          </li>
                          <li>
                        <span className="item-data">info</span>
                          </li>
                          <li>                     
                            <span className="item-data block-color">
                              {' '}
                              {rfp.blockHash}
                            </span>
                        </li>
                        <li className="action">
                          <Button
                            onClick={rfp.status === 'open' ? this.getPurchaseModalClose : this.getPurchaseModal}
                            variant={rfp.status === 'open' ? 'outlined' : 'text'}
                            className="btn-secondary"
                          >
                            {rfp.status}
                          </Button>
                        </li>                     
                      </ul>                                                               
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
                          style={{ display: 'inline-block', minHeight: '20px' }}
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
        <Drawer
          anchor="right"
          open={right}
          onClose={this.toggleDrawer('right', false)}
        >
          <div tabIndex={0} role="button" className="drawer-right">
            <div className="drawer-inner">
              <div className="drawer-header">
                <Typography className="title" variant="h5">
                  RFP Submission
                </Typography>
                <Typography className="sub-title" variant="h5">
                  Dell EMC
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
                <div
                  className="cta-actions text-left"
                  style={{ float: 'left' }}
                >
                  <Button onClick={this.onOpen} variant="text" color="primary">
                    Review
                  </Button>
                </div>
                <div className="cta-actions left">
                  <Button
                    onClick={this.toggleDrawer('right', false)}
                    variant="outlined"
                    color="primary"
                  >
                    Reject
                  </Button>
                </div>
                <div className="cta-actions right">
                  <Button
                    variant="contained"
                    className="btn-primary"
                    color="primary"
                    onClick={this.purchaseRFP}
                  >
                    Accept
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

export default Rfps;
