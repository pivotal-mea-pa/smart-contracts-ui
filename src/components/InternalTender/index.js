import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTender } from '../../redux/actions/tenderActions';
import { getRFPsByTender } from '../../redux/actions/rfpActions';
import { getNotifications } from '../../redux/actions/notificationActions';
import { getClarificationsByTender } from '../../redux/actions/clarificationActions';
import { getBondsByTender } from '../../redux/actions/bondActions';
import { getAwardsByTender } from '../../redux/actions/awardActions';
import { Tab, Tabs, Grid, Card } from '@material-ui/core';
import Header from './Header';
import VendorBrief from './VendorBrief';
import Evaluation from './Evaluation';
import Awards from './Awards';
import Refunds from './Refunds';
import Clarifications from './Clarifications';
import Rating from './Rating';
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
      getClarificationsByTender,
      getBondsByTender,
      getAwardsByTender,
      getRFPsByTender
    } = this.props;
    const { id } = this.props.match.params;
    getTender(id);
    getClarificationsByTender(id);
    getNotifications();
    getBondsByTender(id);
    getAwardsByTender(id);
    getRFPsByTender(id);
  }

  onChange = (e, tabNumber) => {
    this.setState({ tabNumber });
  };

  render() {
    const { tabNumber } = this.state;
    const { history } = this.props;
    return (
      <div className="tender-page internal">
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
              <Tab className="tender-tab text-capitalize" label="Evaluation" />
              <Tab className="tender-tab text-capitalize" label="Rating" />
              <Tab className="tender-tab text-capitalize" label="Award" />
              <Tab className="tender-tab text-capitalize" label="Refunds" />
            </Tabs>
            {tabNumber === 0 && (
              <div className="tab-detail m-3">
                <VendorBrief />
              </div>
            )}
            {tabNumber === 1 && (
              <Card className="card-table shortlist">
                <Clarifications />
              </Card>
            )}
            <div className="card-container">
              {tabNumber === 2 && (
                <Card className="card-table clarifications">
                  <Evaluation />
                </Card>
              )}
              {tabNumber === 3 && (
                <Card className="card-table bids">
                  <Rating />
                </Card>
              )}
              {tabNumber === 4 && (
                <Card className="card-table bids">
                  <Awards />
                </Card>
              )}
              {tabNumber === 5 && (
                <Card className="card-table bids">
                  <Refunds />
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
  clarificationsList: state.clarifications.clarificationsList
});

const actions = {
  getTender,
  getRFPsByTender,
  getNotifications,
  getClarificationsByTender,
  getBondsByTender,
  getAwardsByTender
};

export default connect(
  mapStateToProps,
  actions
)(Tender);
