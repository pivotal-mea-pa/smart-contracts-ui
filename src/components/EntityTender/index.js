import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTender } from '../../redux/actions/tenderActions';
import { getNotifications } from '../../redux/actions/notificationActions';
import { getClarificationsByTender } from '../../redux/actions/clarificationActions';
import { getBondsByTender } from '../../redux/actions/bondActions';
import { getRFPsByTender } from '../../redux/actions/rfpActions';
import { getRFTsByTender } from '../../redux/actions/rftActions';
import { getAwardsByTender } from '../../redux/actions/awardActions';
import { getBidsByTender } from '../../redux/actions/auctionActions';
import { Tab, Tabs, Badge, Grid, Card } from '@material-ui/core';
import Header from './Header';
import Bidders from './Bidders';
import ShortList from './ShortList';
import Clarifications from './Clarifications';
import TimeLine from './Timeline';
import Bonds from './Bonds';
import Responses from './Responses';
import Auction from './Auction';
import Refund from './Refunds';
import Award from './Awards';

class Tender extends Component {
  state = {
    tabNumber: 0
  };

  componentDidMount() {
    const {
      getTender,
      getRFPsByTender,
      getRFTsByTender,
      getNotifications,
      getClarificationsByTender,
      getBondsByTender,
      getAwardsByTender,
      getBidsByTender
    } = this.props;
    const { id } = this.props.match.params;
    getTender(id);
    getRFPsByTender(id);
    getClarificationsByTender(id);
    getBondsByTender(id);
    getRFTsByTender(id);
    getAwardsByTender(id);
    getBidsByTender(id);
    getNotifications();
  }

  onChange = (e, tabNumber) => {
    this.setState({ tabNumber });
  };

  render() {
    const { tabNumber } = this.state;
    const { bondList } = this.props;
    return (
      <div className="tender-page consumer">
        <Grid container spacing={8}>
          <Grid item sm={8} className="tender-body">
            <Header />
            <Tabs
              value={tabNumber}
              onChange={this.onChange}
              indicatorColor="primary"
              className="mt-5 single-tabs"
            >
              <Tab className="tender-tab text-capitalize" label="Bidders" />
              <Tab
                className="tender-tab text-capitalize"
                label="Clarifications"
              />
              <Tab
                className="tender-tab text-capitalize"
                label={
                  bondList ? (
                    <Badge
                      style={{ padding: '0 16px' }}
                      color="primary"
                      badgeContent={bondList.length}
                    >
                      Bonds
                    </Badge>
                  ) : null
                }
              />
              <Tab className="tender-tab text-capitalize" label="Responses" />
              <Tab className="tender-tab text-capitalize" label="Shortlist" />
              <Tab className="tender-tab text-capitalize" label="Auction" />
              <Tab className="tender-tab text-capitalize" label="Refunds" />
              <Tab className="tender-tab text-capitalize" label="Award" />
            </Tabs>
            {tabNumber === 0 && (
              <Card className="card-table">
                <Bidders />
              </Card>
            )}
            {tabNumber === 1 && (
              <Card className="card-table">
                <Clarifications />
              </Card>
            )}
            <div className="card-container">
              {tabNumber === 2 && (
                <Card className="card-table">
                  <Bonds />
                </Card>
              )}
              {tabNumber === 3 && (
                <Card className="card-table">
                  <Responses />
                </Card>
              )}
              {tabNumber === 4 && (
                <Card className="card-table">
                  <ShortList />
                </Card>
              )}
              {tabNumber === 5 && (
                <Card className="card-table">
                  <Auction />
                </Card>
              )}
              {tabNumber === 6 && (
                <Card className="card-table">
                  <Refund />
                </Card>
              )}
              {tabNumber === 7 && (
                <Card className="card-table">
                  <Award />
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
  tender: state.tenders.tenders,
  bondList: state.bonds.bondList
});

const actions = {
  getTender,
  getRFPsByTender,
  getNotifications,
  getClarificationsByTender,
  getBondsByTender,
  getAwardsByTender,
  getRFTsByTender,
  getBidsByTender
};

export default connect(
  mapStateToProps,
  actions
)(Tender);
