import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
class Bonds extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };

  render() {
    const { dateSorting, statusFilter, filterType } = this.state;
    const { bondList, tender } = this.props;
    return (
      <Fragment className="card-table bonds">
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
          <Grid container spacing={8} className="p-3 table-header">
            <Grid item sm={3}>
              Type
            </Grid>
            <Grid item sm={3}>
              Vender
            </Grid>
            <Grid item sm={3}>
              Bond ID
            </Grid>
            <Grid item sm={3}>
              Status
            </Grid>
          </Grid>
          {bondList &&
            bondList.map(
              bond =>
                bond.tender._id === tender._id && (
                  <Card key={bond._id} className="p-3 mb-3">
                    <Grid container spacing={8}>
                      <Grid item sm={3}>
                        {bond.type}
                      </Grid>
                      <Grid item sm={3}>
                        {bond.vendor.name}
                      </Grid>
                      <Grid item sm={3}>
                        <span className="short-id">{bond.blockchainId}</span>
                      </Grid>
                      <Grid item sm={3}>
                        {bond.status === 'Accepted' ? (
                          <span className="status approved">
                            <i className="material-icons">check</i>
                            {bond.status}
                          </span>
                        ) : (
                          <span className="status pending">
                            <i className="material-icons"> alarm</i>
                            {bond.status}
                          </span>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                )
            )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bondList: state.bonds.bondList,
  tender: state.tenders.tender
});

export default connect(mapStateToProps)(Bonds);
