import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  updateAward,
  getAwardsByTender
} from '../../redux/actions/awardActions';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  DialogContent,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Loader from '../common/Loader';
import Success from './Award/Success';

import letterOfAward from '../../award.pdf';

class Awards extends Component {
  state = {
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    open: false,
    stepCount: 1
  };

  openAwardModal = award => {
    this.setState({ open: true });
    const { updateAward, getAwardsByTender, tender } = this.props;
    updateAward({
      ...award,
      status: 'Accepted'
    }).then(() => {
      getAwardsByTender(tender._id);
      setTimeout(() => this.setState({ stepCount: 2 }), 3000);
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
      stepCount
    } = this.state;
    const { awardList, tender } = this.props;
    let step;
    if (stepCount === 1) {
      step = <Loader />;
    } else if (stepCount === 2) {
      step = <Success tender={tender} />;
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
              Accept Award
            </DialogTitle>
            <DialogContent>{step}</DialogContent>
          </Grid>
        </Dialog>
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
              <Grid item sm={2}>
                Name
              </Grid>
              <Grid item sm={2}>
                Vendor #
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
            {awardList &&
              awardList.length > 0 &&
              awardList.map(
                award =>
                  award.status !== 'Refunded' &&
                  award.tender._id === tender._id && (
                    <Card key={award._id} className="p-3 mb-3">
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
                          {award.status === 'Awarded' && (
                            <Button
                              onClick={() => this.openAwardModal(award)}
                              variant="contained"
                              color="secondary"
                              className="solid"
                            >
                              Accept
                            </Button>
                          )}
                          {award.status === 'Accepted' && (
                            <Button
                              variant="outlined"
                              color="secondary"
                              className="outlined"
                            >
                              Accepted
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                  )
              )}
          </div>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  awardList: state.awards.awardList,
  tender: state.tenders.tender
});

const actions = {
  getAwardsByTender,
  updateAward
};

export default connect(
  mapStateToProps,
  actions
)(Awards);
