import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
import letterOfAward from '../../award.pdf';

class Awards extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: ''
  };

  render() {
    const { dateSorting, statusFilter, filterType } = this.state;
    const { awardList } = this.props;
    const awards = awardList.filter(award => award.status !== 'Refunded');
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
          <Grid container spacing={8} className="p-3">
            <Grid item sm={2}>
              Name
            </Grid>
            <Grid item sm={2}>
              Tender #
            </Grid>
            <Grid item sm={2}>
              Award #
            </Grid>
            <Grid item sm={2}>
              Smart Contract #
            </Grid>
            <Grid item sm={2}>
              Letter of Award
            </Grid>
          </Grid>
          {awards &&
            awards.map(award => (
              <Card key={award._id} className="p-3 mb-3 row-item internal">
                <Grid container spacing={8}>
                  <Grid item sm={2}>
                    {award.vendor.name}
                  </Grid>
                  <Grid item sm={2}>
                    {award.vendor.blockchainId}
                  </Grid>
                  <Grid item sm={2}>
                    {award.blockchainId}
                  </Grid>
                  <Grid item sm={2}>
                    {award.smartContractId}
                  </Grid>
                  <Grid item sm={2} className="contains-icon">
                    <a href={letterOfAward} download="Award">
                      <i
                        className="material-icons"
                        style={{ color: '#006500' }}
                      >
                        note
                      </i>{' '}
                      Letter of Award
                    </a>
                  </Grid>
                  <Grid item sm={2} className="text-right">
                    <Button variant="outlined" color="internal">
                      {award.status === 'Awarded' && (
                        <span>Awarded - Acceptance Pending</span>
                      )}
                      {award.status === 'Accepted' && (
                        <span>Award Accepted</span>
                      )}
                    </Button>
                  </Grid>{' '}
                </Grid>
              </Card>
            ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  awardList: state.awards.awardList
});

export default connect(mapStateToProps)(Awards);
