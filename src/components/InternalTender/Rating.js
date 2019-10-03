import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import StarRating from '../charts/StarRating';

class Rating extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    bidderList: [],
    ratingDialogOpen: false
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      ratingDialogOpen
    } = this.state;
    const { bidderList } = this.props;
    return (
      <Fragment>
        <Dialog
          open={ratingDialogOpen}
          onClose={() => this.setState({ ratingDialogOpen: false })}
          className="auth-modal vender-info internal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Vender History
            </DialogTitle>
            <DialogContent className="modal-body">
              <Grid container className="grid-body">
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Legal Issues</div>
                    <div className="block-body">0</div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Compliance Issues</div>
                    <div className="block-body">Yes/No</div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Goverment Tenders</div>
                    <div className="block-body">7690</div>
                  </div>
                </Grid>
              </Grid>
              <Grid container className="grid-body">
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Awarded Tenders</div>
                    <div className="block-body">478</div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Shortlisting</div>
                    <div className="block-body">679</div>
                  </div>
                </Grid>
                <Grid item sm={4}>
                  <div className="block-container">
                    <div className="block-title">Non Award</div>
                    <div className="block-body">896</div>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="align-right cta-actions">
              <Button
                variant="outlined"
                className="outlined internal"
                onClick={() => this.setState({ ratingDialogOpen: false })}
              >
                close
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>

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
              Name
            </Grid>
            <Grid item sm={3}>
              Vender #
            </Grid>
            <Grid item sm={3}>
              Purchase #
            </Grid>
            <Grid item sm={3}>
              Rating
            </Grid>
          </Grid>
          {bidderList.map(bidr => (
            <Card key={bidr._id} className="p-3 mb-3 internal">
              <Grid container spacing={8}>
                <Grid item sm={3}>
                  {bidr.vendor.name}
                </Grid>
                <Grid item sm={3}>
                  {bidr.vendor.blockchainId}
                </Grid>
                <Grid item sm={3}>
                  {bidr.blockchainId}
                </Grid>
                <Grid item sm={3}>
                  <div
                    onClick={() => this.setState({ ratingDialogOpen: true })}
                  >
                    <StarRating rating={bidr.vendor.rating} />
                  </div>
                </Grid>
              </Grid>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bidderList: state.rfps.rfpList
});

export default connect(mapStateToProps)(Rating);
