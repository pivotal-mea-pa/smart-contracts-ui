import React, { Component } from 'react';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import StarRating from '../charts/StarRating';

class ShortList extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };

  render() {
    const { dateSorting, statusFilter, filterType } = this.state;
    const { shortList } = this.props;
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
              Name
            </Grid>
            <Grid item sm={3}>
              Rating
            </Grid>
            <Grid item sm={3}>
              Time
            </Grid>
          </Grid>
          {shortList &&
            shortList.map(vendor => (
              <Card key={vendor.name} className="p-3 mb-3">
                <Grid container spacing={8}>
                  <Grid item sm={3}>
                    {vendor.name}
                  </Grid>
                  <Grid item sm={3}>
                    <StarRating rating={vendor.rating} />
                  </Grid>
                  <Grid item sm={3} className="text-info">
                    <History /> {vendor.time}
                  </Grid>
                  <Grid item sm={3} className="text-right">
                    <Button variant="outlined" color="primary">
                      View
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
        </div>
      </Card>
    );
  }
}

export default ShortList;
