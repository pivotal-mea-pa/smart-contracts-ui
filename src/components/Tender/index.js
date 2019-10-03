import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTender } from '../../redux/actions/tenderActions';
import { getRFPsByVendor } from '../../redux/actions/rfpActions';
import { getNotifications } from '../../redux/actions/notificationActions';
import { getClarificationsByTender } from '../../redux/actions/clarificationActions';
import { getBondsByVendor } from '../../redux/actions/bondActions';
import { getAwardsByVendor } from '../../redux/actions/awardActions';
import { getBidsByVendor } from '../../redux/actions/auctionActions';
import { Tab, Tabs, Badge, Grid, Card } from '@material-ui/core';
import Header from './Header';
import VendorBrief from './VendorBrief';
import Submissions from './Submissions';
import Bonds from './Bonds';
import Awards from './Awards';
import Refunds from './Refunds';
import Clarifications from './Clarifications';
import Bids from './Bids';
import TimeLine from './Timeline';

class Tender extends Component {
  state = {
    tabNumber: 0,
    rfpsSubmitted: [],
    vendorId: ''
  };

  componentDidMount() {
    const {
      getTender,
      getNotifications,
      getClarificationsByTender
    } = this.props;
    const { id } = this.props.match.params;
    getTender(id);
    getNotifications();
    getClarificationsByTender(id);
  }

  componentDidUpdate(prevProps) {
    const {
      getRFPsByVendor,
      getBondsByVendor,
      vendor,
      getAwardsByVendor,
      getBidsByVendor
    } = this.props;
    if (vendor._id !== prevProps.vendor._id) {
      getRFPsByVendor(vendor._id);
      getBondsByVendor(vendor._id);
      getAwardsByVendor(vendor._id);
      getBidsByVendor(vendor._id);
    }
  }

  onChange = (e, tabNumber) => {
    this.setState({ tabNumber });
  };

  render() {
    const { tabNumber, rfpsSubmitted } = this.state;
    const { history } = this.props;
    return (
      <div className="tender-page vendor">
        <Grid container spacing={8}>
          <Grid item sm={8} className="tender-body">
            <Header history={history} />
            <Tabs
              value={tabNumber}
              onChange={this.onChange}
              indicatorColor="primary"
              className="mt-5 single-tabs"
            >
              <Tab
                className="tender-tab text-capitalize"
                label="Tender Brief"
              />
              <Tab
                className="tender-tab text-capitalize"
                label="Clarifications"
              />
              <Tab
                className="tender-tab text-capitalize"
                label={
                  rfpsSubmitted.length > 0 ? (
                    <Badge
                      style={{ padding: '0 16px' }}
                      color="primary"
                      badgeContent={rfpsSubmitted.length}
                    >
                      Submissions
                    </Badge>
                  ) : (
                    'Submissions'
                  )
                }
              />
              <Tab className="tender-tab text-capitalize" label="Bonds" />
              <Tab className="tender-tab text-capitalize" label="Auctions" />
              <Tab className="tender-tab text-capitalize" label="Awards" />
              <Tab className="tender-tab text-capitalize" label="Refunds" />
            </Tabs>
            {tabNumber === 0 && (
              <div className="tab-detail m-3">
                <VendorBrief />
              </div>
            )}
            {tabNumber === 1 && (
             <Card className="card-table clarifications">
                <Clarifications />
              </Card>
            )}
            <div className="card-container">
              {tabNumber === 2 && (
                <Card className="card-table clarifications">
                  {' '}
                  <Submissions />
                </Card>
              )}
              {tabNumber === 3 && (
                <Card className="card-table bids">
                  <Bonds />
                </Card>
              )}
              {tabNumber === 4 && (
                <Card className="card-table bids">
                  <Bids />
                </Card>
              )}
              {tabNumber === 5 && (
                <Card className="card-table bids">
                  <Awards />
                </Card>
              )}
              {tabNumber === 6 && (
                <Card className="card-table bids">
                  <Refunds />
                </Card>
              )}
              {tabNumber === 7 && (
                <Card className="card-table bids">
                  <Bids />
                </Card>
              )}
            </div>
          </Grid>
          <Grid item sm={4} className="history bg-muted">
            <TimeLine />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tender: state.tenders.tender,
  rfpList: state.rfps.rfpList,
  vendor: state.profiles.profile,
  awardList: state.awards.awardList
});

const actions = {
  getTender,
  getRFPsByVendor,
  getNotifications,
  getClarificationsByTender,
  getBondsByVendor,
  getAwardsByVendor,
  getBidsByVendor
};

export default connect(
  mapStateToProps,
  actions
)(Tender);
