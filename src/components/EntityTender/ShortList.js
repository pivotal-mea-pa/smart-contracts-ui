import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateRFP, getRFPsByTender } from '../../redux/actions/rfpActions';
import {
  addNotification,
  getNotifications
} from '../../redux/actions/notificationActions';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import StarRating from '../charts/StarRating';

class ShortList extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    ratingModalOpen: false
  };

  onRemoveFromShortList = rfp => {
    const {
      updateRFP,
      getRFPsByTender,
      tender,
      addNotification,
      getNotifications,
      user
    } = this.props;
    updateRFP({
      ...rfp,
      status: 'vendorSubmitted'
    }).then(() => {
      addNotification({
        type: 'Vendor Removed From Shortlist',
        status: 'Removed',
        tender: tender._id,
        EntityOrVendor: rfp.vendor,
        createdDate: new Date(),
        createdBy: user.id
      }).then(() => {
        getNotifications();
        getRFPsByTender(tender._id);
      });
    });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      ratingModalOpen
    } = this.state;
    const { shortList } = this.props;
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
          <Grid container spacing={8} className="p-3 table-header">
            <Grid item sm={2}>
              Name
            </Grid>
            <Grid item sm={2}>
              Vender #
            </Grid>
            <Grid item sm={2}>
              Purchase #
            </Grid>
            <Grid item sm={3}>
              Rating
            </Grid>
          </Grid>
          {shortList.map(
            rfp =>
              rfp.status === 'Shortlisted' && (
                <Card key={rfp._id} className="p-3 mb-3">
                  <Grid container spacing={8}>
                    <Grid item sm={2}>
                      {rfp.vendor.name}
                    </Grid>
                    <Grid item sm={2}>
                      {rfp.vendor.blockchainId}
                    </Grid>
                    <Grid item sm={2}>
                      {rfp.purchaseId}
                    </Grid>
                    <Grid item sm={3}>
                      <div
                        onClick={() => this.setState({ ratingModalOpen: true })}
                      >
                        <StarRating rating={rfp.vendor.rating} />
                      </div>
                    </Grid>
                    <Grid item sm={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.onRemoveFromShortList(rfp)}
                      >
                        <i class="material-icons">remove_circle_outline</i>{' '}
                        Shortlist
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              )
          )}
        </div>
        <Dialog
          open={ratingModalOpen}
          onClose={() => this.setState({ ratingModalOpen: false })}
          className="auth-modal vender-info"
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
                onClick={() => this.setState({ ratingModalOpen: false })}
                color="primary"
              >
                close
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  shortList: state.rfps.rfpList,
  tender: state.tenders.tender,
  user: state.auth.user
});

const actions = {
  updateRFP,
  getRFPsByTender,
  addNotification,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(ShortList);
