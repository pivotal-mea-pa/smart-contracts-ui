import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import getTimeStamp from '../../utils/getTimeStamp';
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { Search, ExpandMore } from '@material-ui/icons';

class Queries extends Component {
  state = {
    viewDialogOpen: false,
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    currentClarification: {}
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      viewDialogOpen,
      currentClarification
    } = this.state;
    const { clarificationList } = this.props;
    return (
      <Fragment>
        <Dialog
          open={viewDialogOpen}
          onClose={() => this.setState({ viewDialogOpen: false })}
          className="auth-modal rfp-modal query-modal"
          aria-labelledby="form-dialog-title"
        >
          <Grid container className="auth-body">
            <span
              className="close-modal"
              onClick={() => this.setState({ viewDialogOpen: false })}
            >
              <i className="material-icons">close</i>
            </span>
            <DialogTitle className="dialog-title" id="rfp-modal-title">
              Clarification {currentClarification._id}
            </DialogTitle>
            <DialogContent>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  className="summary"
                  expandIcon={<ExpandMore />}
                >
                  <div className="subtitle">Vender Query</div>
                  <p>{currentClarification.query}</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="details">
                  <div className="subtitle">Entity Reply</div>
                  <p>{currentClarification.message}</p>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </DialogContent>
            <DialogActions className="align-right">
              <Button
                variant="outlined"
                onClick={() => this.setState({ viewDialogOpen: false })}
                color="secondary"
              >
                Close
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
          <Grid container spacing={8} className="p-3">
            <Grid item sm={2}>
              Tender
            </Grid>
            <Grid item sm={2} />
            <Grid item sm={3}>
              Type
            </Grid>
            <Grid item sm={2}>
              Time
            </Grid>
          </Grid>
          {clarificationList &&
            clarificationList.map(query => (
              <Card key={query._id} className="p-3 mb-3">
                <Grid container spacing={8}>
                  <Grid item sm={2}>
                    {query.tender.name}
                  </Grid>
                  <Grid item sm={2} />
                  <Grid item sm={3}>
                    Query
                  </Grid>
                  <Grid item sm={2}>
                    {getTimeStamp(query.createdDate)}
                  </Grid>
                  <Grid item sm={3} className="text-right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        this.setState({
                          currentClarification: query,
                          viewDialogOpen: true
                        })
                      }
                    >
                      View
                    </Button>
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
  clarificationList: state.clarifications.clarificationList
});

export default connect(mapStateToProps)(Queries);
