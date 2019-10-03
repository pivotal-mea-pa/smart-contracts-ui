import React from 'react';
import { connect } from 'react-redux';
import { addRFP, getRFPsByVendor } from '../../redux/actions/rfpActions';
import { addBond, getBondsByVendor } from '../../redux/actions/bondActions';
import readFiles from '../../utils/readFiles';
import {
  addNotification,
  getNotifications
} from '../../redux/actions/notificationActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Button,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent
} from '@material-ui/core/';
import Dropzone from 'react-dropzone';
import uuid from 'uuid';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
};

class PurchaseRFT extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    success: false,
    name: '',
    bidValue: '',
    termsAgreed: false,
    technicalDisplayFileList: [],
    financialDisplayFileList: [],
    technicalFile: '',
    financialFile: '',
    uploadFileList: [],
    technicalDialogOpen: false,
    financialDialogOpen: false,
    financialFileName: '',
    technicalFileName: ''
  };

  componentDidMount() {
    const { name } = this.props.vendor;
    this.setState({ name });
  }

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
    if (!open) {
      this.setState({ success: false });
    }
  };

  getSuccessMessage = () => {
    this.setState({ success: true });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      tender,
      vendor,
      addRFP,
      user,
      getRFPsByVendor,
      addNotification,
      getNotifications,
      addBond,
      getBondsByVendor
    } = this.props;
    const { bidValue, technicalFile, financialFile } = this.state;
    const blockchainId = uuid().substring(0, 10);
    const newRFP = {
      tender: tender._id,
      vendor: vendor._id,
      bidValue,
      termsAgreed: true,
      status: 'vendorSubmitted',
      technicalDocumentURL: technicalFile,
      financialDocumentURL: financialFile,
      bondBlockchainId: blockchainId
    };

    addRFP(newRFP).then(rfp => {
      addBond({
        tender: tender._id,
        vendor: vendor._id,
        type: 'Bid Bond',
        status: 'Accepted',
        blockchainId
      });
      addNotification({
        tender: tender._id,
        EntityOrVendor: vendor._id,
        rfp: rfp._id,
        type: 'RFP Submitted',
        status: 'Submitted',
        createdBy: user.id,
        createdDate: new Date()
      }).then(() => {
        getNotifications();
        getRFPsByVendor(vendor._id);
        getBondsByVendor(vendor._id);
        this.getSuccessMessage();
      });
    });
  };

  onDrop = files => {
    console.log(files);
    readFiles(files).then(res => {
      this.setState({ uploadFileList: res, displayFileList: files });
    });
  };

  onTechnicalDrop = files => {
    readFiles(files).then(res => {
      const { name } = res[0].file;
      this.setState({
        technicalFile: res[0].result,
        technicalDisplayFileList: files,
        technicalFileName: name
      });
    });
  };

  onFinancialDrop = files => {
    readFiles(files).then(res => {
      const { name } = res[0].file;
      this.setState({
        financialFile: res[0].result,
        financialDisplayFileList: files,
        financialFileName: name
      });
    });
  };

  onUploadClose = () => {
    this.setState({
      technicalDialogOpen: false,
      financialDialogOpen: false
    });
  };

  render() {
    const {
      success,
      name,
      bidValue,
      right,
      termsAgreed,
      technicalDialogOpen,
      financialDialogOpen,
      technicalDisplayFileList,
      financialDisplayFileList,
      financialFileName,
      technicalFileName
    } = this.state;

    const technicalFile = technicalDisplayFileList.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    const financialFile = financialDisplayFileList.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <div>
        <Button
          className="btn-secondary"
          style={{ float: 'right' }}
          onClick={() => this.toggleDrawer('right', true)}
        >
          Submit RFP
        </Button>
        <Drawer
          anchor="right"
          open={right}
          onClose={() => this.toggleDrawer('right', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('right', false)}
            onKeyDown={() => this.toggleDrawer('right', false)}
          />
          <div className="drawer-body">
            <div className="header-section">
              <h1>RFP Submission</h1>
              <div className="subtitle">DNS Solutions</div>
            </div>

            {!success ? (
              <div className="form-body">
                <TextField
                  margin="dense"
                  id="venderId"
                  label="Vender Name"
                  className="secondary"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  fullWidth
                />
                <FormControl className="upload-container">
                  <TextField
                    margin="dense"
                    id="technicalFile"
                    label="Technical Document"
                    type="username"
                    className="secondary"
                    name="tecDoc"
                    fullWidth
                    value={technicalFileName}
                  />
                  <Button
                    className="upload-btn"
                    color="secondary"
                    variant="contained"
                    onClick={() => this.setState({ technicalDialogOpen: true })}
                  >
                    Upload
                  </Button>
                </FormControl>
                <FormControl className="upload-container">
                  <TextField
                    margin="dense"
                    id="financialFile"
                    label="Financial Document"
                    type="username"
                    className="secondary"
                    name="finDoc"
                    fullWidth
                    value={financialFileName}
                  />
                  <Button
                    className="upload-btn"
                    color="secondary"
                    variant="contained"
                    onClick={() => this.setState({ financialDialogOpen: true })}
                  >
                    Upload
                  </Button>
                </FormControl>

                <TextField
                  margin="dense"
                  id="venderId"
                  label="Bid Bond Value"
                  name="bidValue"
                  className="secondary"
                  value={bidValue}
                  onChange={this.onChange}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={e => {
                        this.setState({ termsAgreed: e.target.checked });
                      }}
                      checked={termsAgreed}
                      color="secondary"
                    />
                  }
                  label="I Agree to the Terms and Conditions"
                />
              </div>
            ) : (
              <div className="form-body">
                <div id="step-three">
                  <div className="success-message-container">
                    <div className="success-message">
                      <div className="success-text">Success</div>
                    </div>
                  </div>

                  <div className="form-body success">
                    <p>
                      you have successfully responded to the tender. Your Bid
                      Bond ID is <span className="primary">#6098267</span>{' '}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {!success ? (
              <div className="cta-actions">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => this.toggleDrawer('right', false)}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-secondary"
                  disabled={!termsAgreed}
                  onClick={this.onSubmit}
                >
                  Issue Bid Bond
                </Button>
              </div>
            ) : (
              <div className="cta-actions">
                <Button
                  className="btn-secondary"
                  onClick={() => this.toggleDrawer('right', false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
          <Dialog open={technicalDialogOpen} onClose={this.onUploadClose}>
            <DialogContent>
              <Dropzone multiple={false} onDrop={this.onTechnicalDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop a file here, or click to select file</p>
                    </div>
                    <aside>
                      <h4>Files</h4>
                      <ul>{technicalFile}</ul>
                    </aside>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() =>
                        this.setState({ technicalDialogOpen: false })
                      }
                    >
                      Close
                    </Button>
                  </section>
                )}
              </Dropzone>
            </DialogContent>
          </Dialog>
          <Dialog open={financialDialogOpen} onClose={this.onUploadClose}>
            <DialogContent>
              <Dropzone multiple={false} onDrop={this.onFinancialDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop a file here, or click to select file</p>
                    </div>
                    <aside>
                      <h4>Files</h4>
                      <ul>{financialFile}</ul>
                    </aside>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() =>
                        this.setState({ financialDialogOpen: false })
                      }
                    >
                      Close
                    </Button>
                  </section>
                )}
              </Dropzone>
            </DialogContent>
          </Dialog>
        </Drawer>
      </div>
    );
  }
}

PurchaseRFT.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vendor: state.profiles.profile,
  tender: state.tenders.tender,
  user: state.auth.user
});

const actions = {
  getRFPsByVendor,
  addRFP,
  addNotification,
  getNotifications,
  addBond,
  getBondsByVendor
};

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(PurchaseRFT));
