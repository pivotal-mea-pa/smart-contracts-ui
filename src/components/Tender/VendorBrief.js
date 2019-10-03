import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Typography,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import getMimeType from '../../utils/getMimeType';

class VendorBrief extends Component {
  state = {
    expanded: null,
    open: false
  };

  handleChangeAccordian = panel => (e, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  downloadFiles = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  // Started download of zip but will take too long for today

  // onDownload = () => {
  //   const { files } = this.props.tender;
  //   const zip = new JSZip();
  //   const documents = zip.folder("documents");
  //
  //   files.forEach((file, i) => {
  //     const mimeType = getMimeType(file);
  //
  //     documents.file(`File${1}.${mimeType}`, file);
  //   });
  //
  //   zip.generateAsync({type:"base64"})
  //     .then(function(content) {
  //       // Force down of the Zip file
  //       saveAs(content, "archive.zip");
  //       this.setState({ open: false });
  //     });
  // }

  _base64ToArrayBuffer = base64 => {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  };

  renderSingleFile = file => {
    const { files } = this.props.tender;
    if (files) {
      return files.map((file, i) => {
        const mimeType = getMimeType(file);
        return (
          <Fragment key={i}>
            <li>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  style={{ color: '#006500', fontSize: 16, marginRight: 10 }}
                  className="material-icons"
                >
                  get_app
                </i>
                <a href={file} download={`File${i + 1}.${mimeType}`}>
                  {`File ${i + 1}`}{' '}
                </a>
              </div>
            </li>
          </Fragment>
        );
      });
    }
  };

  documentSubmissions = () => {
    // Creating one subission for now.
    const { expanded } = this.state;
    const { blockchainId } = this.props.tender;

    return (
      <ExpansionPanel
        className=""
        expanded={expanded === 'panel1'}
        onChange={this.handleChangeAccordian('panel1')}
      >
        <ExpansionPanelSummary
          className="panel-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className="accord-title">
            {`Submission #${blockchainId}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="panel-details">
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {this.renderSingleFile()}
          </ul>
          {/*<div className="download-cta" onClick={this.downloadFiles}>*/}
          {/*<span className="down-text">download all</span>*/}
          {/*<i className="material-icons">get_app</i>*/}
          {/*</div>*/}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  render() {
    const { open } = this.state;
    const { brief } = this.props.tender;

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
              Download Submisson
            </DialogTitle>
            <DialogContent>
              By selecting download you will download a zip file.
            </DialogContent>
            <DialogActions className="align-right">
              <Button
                variant="outlined"
                onClick={this.onClose}
                color="secondary"
              >
                close
              </Button>
              <Button
                variant="contained"
                className="solid"
                onClick={this.onClose}
                color="secondary"
              >
                Download
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>

        <Grid container spacing={8}>
          <Grid item sm={8}>
            <div className="tender-section">
              <Typography className="tab-title" variant="h5">
                Tender Brief
              </Typography>
              <Typography variant="body1">{brief}</Typography>
            </div>
          </Grid>
          <Grid item sm={4}>
            <div className="tender-submissions-container">
              <div className="submission-title">Document Submission</div>
              <div className="submission-body">
                {this.documentSubmissions()}
              </div>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tender: state.tenders.tender
});

export default connect(mapStateToProps)(VendorBrief);
