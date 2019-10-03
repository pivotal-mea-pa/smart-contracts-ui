import React, { Component, Fragment } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tenders from '../dashboards/InternalDashboard/Tenders';

class VendorBrief extends Component {
  state = {
    expanded: null
  };

  handleChangeAccordian = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <Fragment>
        <Grid container spacing={8}>
          <Grid item sm={8}>
            <div className="tender-section">
              <Typography className="tab-title" variant="h5">
                Tender Brief
              </Typography>
              <Typography>{Tenders.brief}</Typography>
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className="tender-submissions-container">
              <div className="submission-title">Document Submission</div>
              <div className="submission-body">
                <ExpansionPanel
                  className=""
                  expanded={expanded === 'panel1'}
                  onChange={this.handleChangeAccordian('panel1')}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="accord-title">
                      Submission #125
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <ul>
                        <li>File_ONE.pdf</li>
                        <li>File_TWO.pdf</li>
                        <li>File_THREE.pdf</li>
                        <li>File_FOUR.pdf</li>
                      </ul>
                    </Typography>
                    <div className="download-cta">
                      <span className="down-text">download all</span>
                      <i class="material-icons">get_app</i>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={expanded === 'panel2'}
                  onChange={this.handleChangeAccordian('panel2')}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Submission #126</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <ul>
                        <li>File_ONE.pdf</li>
                        <li>File_TWO.pdf</li>
                        <li>File_THREE.pdf</li>
                        <li>File_FOUR.pdf</li>
                      </ul>
                    </Typography>
                    <div className="download-cta">
                      <span className="down-text">download all</span>
                      <i class="material-icons">get_app</i>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  expanded={expanded === 'panel3'}
                  onChange={this.handleChangeAccordian('panel3')}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Submission #127</Typography>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Typography>
                      <ul>
                        <li>File_ONE.pdf</li>
                        <li>File_TWO.pdf</li>
                        <li>File_THREE.pdf</li>
                        <li>File_FOUR.pdf</li>
                      </ul>
                    </Typography>
                    <div className="download-cta">
                      <span className="down-text">download all</span>
                      <i class="material-icons">get_app</i>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default VendorBrief;
