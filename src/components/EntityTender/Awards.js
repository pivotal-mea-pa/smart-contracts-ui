import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  updateAward,
  getAwardsByTender
} from '../../redux/actions/awardActions';
import { updateRFT, getRFTsByTender } from '../../redux/actions/rftActions';
import { updateRFP, getRFPsByTender } from '../../redux/actions/rfpActions';
import { updateTender, getTender } from '../../redux/actions/tenderActions';
import { addBond, getBondsByTender } from '../../redux/actions/bondActions';
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
import Loader from '../common/Loader';
import Success from './AwardMessage/Success';
import uuid from 'uuid';

class Awards extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    awards: [],
    open: false,
    stepCount: 1,
    awardedVendor: {},
    ratingModalOpen: false
  };

  onAward = award => {
    this.setState({ open: true });
    const {
      updateAward,
      getAwardsByTender,
      getRFPsByTender,
      getRFTsByTender,
      getNotifications,
      getTender,
      getBondsByTender,
      addBond,
      addNotification,
      updateTender,
      updateRFP,
      updateRFT,
      tender,
      rftList,
      rfpList,
      awardList,
      user
    } = this.props;
    const bondBlockchainId = uuid().substring(0, 10);
    const smartContractId = uuid().substring(0, 10);
    updateAward({
      ...award,
      status: 'Awarded',
      bondBlockchainId,
      smartContractId
    }).then(() => {
      console.log(rfpList);
      rfpList.forEach(rfp => {
        if (rfp.vendor._id === award.vendor._id) {
          updateRFP({
            ...rfp,
            status: 'Awarded'
          }).then(() => this.setState({ awardedVendor: rfp.vendor }));
        } else {
          updateRFP({
            ...rfp,
            status: 'Closed'
          });
        }
      });
      rftList.forEach(rft => {
        if (rft.vendor._id === award.vendor._id) {
          updateRFT({
            ...rft,
            status: 'Awarded'
          });
        } else {
          updateRFT({
            ...rft,
            status: 'Closed'
          });
        }
      });
      awardList.forEach(tmpAward => {
        if (tmpAward.vendor._id !== award.vendor._id) {
          updateAward({
            ...tmpAward,
            status: 'Refunded'
          });
        }
      });
      updateTender({
        ...tender,
        status: 'Closed'
      }).then(() => {
        addBond({
          type: 'Performance Bond',
          status: 'Accepted',
          tender: tender._id,
          vendor: award.vendor._id,
          blockchainId: bondBlockchainId
        }).then(() => {
          addNotification({
            type: 'Tender Contract Awarded',
            status: 'Awarded',
            tender: tender._id,
            vendor: award.vendor._id,
            createdBy: user.id,
            createdDate: new Date()
          }).then(() => {
            getAwardsByTender(tender._id);
            getRFPsByTender(tender._id);
            getRFTsByTender(tender._id);
            getNotifications();
            getTender(tender._id);
            getBondsByTender(tender._id);
            setTimeout(() => this.setState({ stepCount: 2 }), 3000);
          });
        });
      });
    });
  };

  closeAwardModal = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      open,
      stepCount,
      awardedVendor,
      ratingModalOpen
    } = this.state;
    const { awardList, tender } = this.props;
    let step;
    if (stepCount === 1) {
      step = <Loader />;
    } else if (stepCount === 2) {
      step = (
        <Success
          vendorBlockchainId={awardedVendor.blockchainId}
          tenderBlockchainId={tender.blockchainId}
        />
      );
    }

    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.closeAwardModal}
          className="auth-modal bid-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <span className="close-modal" onClick={this.closeAwardModal}>
              <i className="material-icons">close</i>
            </span>
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Award Tender
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
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
            <Grid item sm={2}>
              Name
            </Grid>
            <Grid item sm={2}>
              Vendor #
            </Grid>
            <Grid item sm={2}>
              Purchase #
            </Grid>
            <Grid item sm={3}>
              Rating
            </Grid>
          </Grid>
          {awardList &&
            awardList.length > 0 &&
            awardList.map(
              award =>
                award.status !== 'Refunded' && (
                  <Card key={award._id} className="p-3 mb-3">
                    <Grid container spacing={8}>
                      <Grid item sm={2}>
                        {award.vendor.name}
                      </Grid>
                      <Grid item sm={2}>
                        {award.vendor.blockchainId}
                      </Grid>
                      <Grid item sm={2} className="text-info">
                        {award.blockchainId}
                      </Grid>
                      <Grid item sm={2}>
                        <div
                          onClick={() =>
                            this.setState({ ratingModalOpen: true })
                          }
                        >
                          <StarRating rating={award.vendor.rating} />
                        </div>
                      </Grid>
                      <Grid item sm={3} className="text-right">
                        {award.status === 'Pending' && (
                          <Button
                            onClick={() => this.onAward(award)}
                            className="btn-primary"
                            color="primary"
                          >
                            Award
                          </Button>
                        )}
                        {award.status === 'Awarded' && (
                          <Button
                            color="internal"
                            variant="outlined"
                            disabled={true}
                          >
                            Awarded
                          </Button>
                        )}
                        {award.status === 'Accepted' && (
                          <Button
                            color="internal"
                            variant="outlined"
                            disabled={true}
                          >
                            Award Accepted
                          </Button>
                        )}
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
  awardList: state.awards.awardList,
  rftList: state.rfts.rftList,
  rfpList: state.rfps.rfpList,
  bondList: state.bonds.bondList,
  tender: state.tenders.tender,
  user: state.auth.user
});

const actions = {
  updateAward,
  getAwardsByTender,
  getRFPsByTender,
  getRFTsByTender,
  getNotifications,
  getTender,
  getBondsByTender,
  addBond,
  addNotification,
  updateTender,
  updateRFP,
  updateRFT
};

export default connect(
  mapStateToProps,
  actions
)(Awards);
