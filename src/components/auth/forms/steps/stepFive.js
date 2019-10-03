import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constructRegistration } from '../../../../redux/actions/authActions';
import { Select, FormControl, MenuItem } from '@material-ui/core/';

class StepFive extends Component {
  state = {
    hasEnvironmentalIssuesPolicy: 'no'
  };

  componentWillUnmount() {
    const { constructRegistration, payload } = this.props;
    const { hasEnvironmentalIssuesPolicy } = this.state;
    constructRegistration({ ...payload, hasEnvironmentalIssuesPolicy });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { hasEnvironmentalIssuesPolicy } = this.state;
    return (
      <div id="step-two">
        <div className="form-subtitle">Environmental</div>
        <div className="form-body">
          <div className="terms-container">
            <p>
              Do you have a documented policy and Company for the management of
              construction-related environmental issues?
            </p>
            <span className="">
              <FormControl>
                <Select
                  value={hasEnvironmentalIssuesPolicy}
                  onChange={this.onChange}
                  displayEmpty
                  id="hasEnvironmentalIssuesPolicy"
                  name="hasEnvironmentalIssuesPolicy"
                  value={hasEnvironmentalIssuesPolicy}
                  className="selected-empty"
                  fullWidth
                >
                  <MenuItem value={null}>Please Select</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </span>
            <p>
              Do you have documented arrangements for ensuring that your
              environmental management procedures are effective in
              reducing/preventing significant impacts on the environment?
              Including but not limited to:
            </p>
            <ul>
              <li>Sustainable materials procurement</li>
              <li>waste management</li>
              <li>energy management</li>
            </ul>
            <p>
              This should include the arrangements for responding to, monitoring
              and recording environmental incidents and emergencies and
              complaints.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payload: state.auth.newVendorFields.payload
});

const actions = {
  constructRegistration
};

export default connect(
  mapStateToProps,
  actions
)(StepFive);
