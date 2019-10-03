import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import getTimeStamp from '../../utils/getTimeStamp';
import {
  getClarificationsByTender,
  addClarification
} from '../../redux/actions/clarificationActions';
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
  TextField,
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
    createDialogOpen: false,
    dateSorting: '',
    statusFilter: '',
    filterType: '',
    currentClarification: {},
    clarificationMessage: '',
    vendorQuery: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClarification = () => {
    const {
      tender,
      addClarification,
      getClarificationsByTender,
      addNotification,
      getNotifications,
      user
    } = this.props;
    const { clarificationMessage, vendorQuery } = this.state;
    addClarification({
      tender: tender._id,
      type: 'Query',
      query: vendorQuery,
      message: clarificationMessage,
      status: 'Submitted'
    }).then(res => {
      addNotification({
        tender: tender._id,
        type: 'Clarification Submitted',
        status: 'Submitted',
        createdBy: user.id,
        createdDate: new Date()
      }).then(res => {
        getClarificationsByTender(tender._id);
        getNotifications();
        this.setState({
          createDialogOpen: false,
          clarificationMessage: '',
          vendorQuery: ''
        });
      });
    });
  };

  render() {
    const {
      dateSorting,
      statusFilter,
      filterType,
      viewDialogOpen,
      createDialogOpen,
      clarificationMessage,
      vendorQuery,
      currentClarification
    } = this.state;
    const { clarificationList } = this.props;
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
          <Grid container spacing={8} className="p-3">
            <Grid item sm={2}>
              Name
            </Grid>
            <Grid item sm={2} />
            <Grid item sm={3}>
              Type
            </Grid>
            <Grid item sm={2}>
              Time
            </Grid>
          </Grid>
          {clarificationList
            ? clarificationList.map(query => (
                <Card key={query._id} className="p-3 mb-3 row-item internal">
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
                        className="internal outlined"
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
              ))
            : 'No Clarifications'}
        </div>
        <Grid container>
          <Grid item sm={9} />
          <Grid item sm={3}>
            <Button
              className="bg-internal text-white"
              onClick={() => this.setState({ createDialogOpen: true })}
            >
              Add Clarification
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={createDialogOpen}
          onClose={() => this.setState({ createDialogOpen: false })}
          className="query-modal"
        >
          <DialogContent>
            <TextField
              name="vendorQuery"
              value={vendorQuery}
              onChange={this.onChange}
              label="Vendor Query"
              margin="dense"
              fullWidth
              className="internal-field"
            />
            <TextField
              name="clarificationMessage"
              value={clarificationMessage}
              onChange={this.onChange}
              label="Clarification Message"
              margin="dense"
              fullWidth
              className="internal-field"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              className="internal outlined"
              onClick={() => this.setState({ createDialogOpen: false })}
            >
              Cancel
            </Button>
            <Button
              className="bg-internal text-white"
              variant="contained"
              onClick={this.onAddClarification}
            >
              Add Clarification
            </Button>
          </DialogActions>
        </Dialog>
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
                onClick={() => this.setState({ viewDialogOpen: false })}
                variant="outlined"
                className="internal outlined"
              >
                Close
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  clarificationList: state.clarifications.clarificationList,
  tender: state.tenders.tender,
  user: state.auth.user
});

const actions = {
  addClarification,
  getClarificationsByTender,
  addNotification,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(Queries);
