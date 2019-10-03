import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRFPs, addRFP } from '../../redux/actions/rfpActions';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button
} from '@material-ui/core';
import { Search, History } from '@material-ui/icons';
import PurchaseRFT from './PurchaseRFT';
import getTimeStamp from '../../utils/getTimeStamp';

class ShortList extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    drawer: false
  };

  getRFTDrawer = e => {
    e.preventDefault();
    this.setState({ drawer: true });
  };

  render() {
    const { dateSorting, statusFilter, filterType } = this.state;
    const { rfpList, tender } = this.props;
    return (
      <Card className="card-table">
        <div className="controls text-right">
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
        </div>
        <div className="card-list">
          <Grid container spacing={8} className="p-3">
            <Grid item sm={3}>
              Submission ID
            </Grid>
            <Grid item sm={3}>
              Bond ID
            </Grid>
            <Grid item sm={3}>
              Time
            </Grid>
          </Grid>
          {rfpList &&
            rfpList.map(
              rfp =>
                rfp.tender._id === tender._id && (
                  <Card key={rfp._id} className="p-3 mb-3">
                    <Grid container spacing={8}>
                      <Grid item sm={3}>
                        <span className="short-id">{rfp.blockchainId}</span>
                      </Grid>
                      <Grid item sm={3}>
                        <span className="short-id">{rfp.bondBlockchainId}</span>
                      </Grid>
                      <Grid item sm={3} className="text-info">
                        <History /> {getTimeStamp(rfp.createdDate)}
                      </Grid>
                    </Grid>
                  </Card>
                )
            )}
        </div>
        <Grid container>
          <Grid item sm={9} />
          <Grid item sm={3}>
            {tender.status !== 'Closed' && <PurchaseRFT />}
          </Grid>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profiles.profile,
  tender: state.tenders.tender,
  rfpList: state.rfps.rfpList
});

const actions = {
  getRFPs,
  addRFP
};

export default connect(
  mapStateToProps,
  actions
)(ShortList);
