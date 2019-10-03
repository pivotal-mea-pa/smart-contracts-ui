import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import VendorDashboard from '../dashboards/VendorDashboard';
import ConsumerDashboard from '../dashboards/ConsumerDashboard';
import InternalDashboard from '../dashboards/InternalDashboard';
import PrivateRoute from '../auth/PrivateRoute';
import AddTender from '../dashboards/InternalDashboard/AddTender';
import Tender from '../Tender';
import InternalTendor from '../InternalTender';
import EntityTender from '../EntityTender';
import Loader from '../common/Loader';

class MasterPage extends Component {
  componentDidMount() {
    const { getCurrentProfile } = this.props;
    getCurrentProfile();
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="master-page">
            <Route exact path="/" component={LandingPage} />
            <Switch>
              <PrivateRoute
                exact
                path="/vendor/dashboard"
                component={VendorDashboard}
              />
              <PrivateRoute
                exact
                path="/entity/dashboard"
                component={ConsumerDashboard}
              />
              <PrivateRoute
                exact
                path="/internal/dashboard"
                component={InternalDashboard}
              />
              <PrivateRoute
                exact
                path="/internal/add-tender"
                component={AddTender}
              />
              <PrivateRoute
                exact
                path="/internal/tender/:id"
                component={InternalTendor}
              />
              <PrivateRoute exact path="/tender/:id" component={Tender} />
              <PrivateRoute
                exact
                path="/entity/tender/:id"
                component={EntityTender}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profiles.profile
});

const actions = {
  getCurrentProfile
};

export default connect(
  mapStateToProps,
  actions
)(MasterPage);
