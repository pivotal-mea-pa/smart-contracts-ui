import React, { Component, Fragment } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

class Bids extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };
  render() {
    const { dateSorting, statusFilter, filterType } = this.state;
    return (
      <Fragment>
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
          <Grid container spacing={8} className="p-3 bid-tab">
            <Grid item sm={2}>
              Vendor
            </Grid>
            <Grid item sm={2}>
              Price
            </Grid>
            <Grid item sm={3}>
              Experience
            </Grid>
            <Grid item sm={2}>
              Rating
            </Grid>
            <Grid item sm={3}>
              Current Bid
            </Grid>
          </Grid>
          <Grid container spacing={8} className="p-3">
            <Grid item sm={12} className="text-right">
              <Button variant="contained" color="primary">
                Open Bid
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default Bids;
