import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addTender } from '../../../redux/actions/tenderActions';
import {
  addNotification,
  getNotifications
} from '../../../redux/actions/notificationActions';
import { getProfiles } from '../../../redux/actions/profileActions';
import { uploadFiles } from '../../../redux/actions/uploadActions';
import Dropzone from 'react-dropzone';
import {
  TextField,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogContent
} from '@material-ui/core';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Header from './Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#3B60A0'
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      }
    },
    MuiPickersDay: {
      day: {
        color: '#3B60A0'
      },
      isSelected: {
        backgroundColor: '#3B60A0'
      },
      current: {
        color: '#3B60A0'
      }
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#3B60A0'
      }
    }
  }
});

class AddTender extends Component {
  state = {
    name: '',
    description: '',
    brief: '',
    rfpPurchaseStartDate: new Date(),
    rfpPurchaseEndDate: new Date(),
    rfpResponseStartDate: new Date(),
    rfpResponseEndDate: new Date(),
    categoryOptions: [
      'Services',
      'Consultancy',
      'Goods',
      'Framework Agreement'
    ],
    categories: [],
    dialogOpen: false,
    uploadFileList: [],
    displayFileList: [],
    errors: {}
  };

  componentDidMount() {
    const { getProfiles } = this.props;
    getProfiles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDrop = files => {
    this.readFiles(files).then(res => {
      this.setState({ uploadFileList: res, displayFileList: files });
    });
  };

  readFiles = files => {
    return Promise.all(
      [].map.call(files, file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ result: reader.result, file, fileName: file.name });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then(results => {
      return results;
    });
  };

  onGoBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  onStartUpload = () => {
    this.setState({ dialogOpen: true });
  };

  onUploadClose = () => {
    this.setState({ dialogOpen: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onServiceChecked = e => {
    const { categories } = this.state;
    let categoryList = categories;
    if (e.target.checked) {
      categoryList.push(e.target.value);
    } else {
      categoryList = categoryList.filter(
        category => category !== e.target.value
      );
    }
    this.setState({ categories: categoryList });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      addTender,
      addNotification,
      getNotifications,
      history,
      user,
      profileList
    } = this.props;
    let companies = profileList.filter(company => company.type === 'Vendor');
    companies = companies.map(company => company._id);
    const {
      name,
      description,
      brief,
      rfpResponseStartDate,
      rfpResponseEndDate,
      rfpPurchaseStartDate,
      rfpPurchaseEndDate,
      categories,
      uploadFileList
    } = this.state;

    const files = uploadFileList.map(file => file.result);

    const newTender = {
      name,
      description,
      brief,
      rfpResponseStartDate: moment(rfpResponseStartDate).format(),
      rfpResponseEndDate: moment(rfpResponseEndDate).format(),
      rfpPurchaseStartDate: moment(rfpPurchaseStartDate).format(),
      rfpPurchaseEndDate: moment(rfpPurchaseEndDate).format(),
      categories,
      status: 'New',
      files,
      companies
    };
    addTender(newTender).then(res => {
      if (res.data) {
        addNotification({
          type: 'Tender Created',
          tender: res.data._id,
          status: 'New Item Created',
          createdBy: user.id,
          createdDate: new Date()
        }).then(() => {
          getNotifications();
          history.push('/');
        });
      }
    });
  };

  render() {
    const {
      name,
      description,
      brief,
      rfpResponseStartDate,
      rfpResponseEndDate,
      rfpPurchaseStartDate,
      rfpPurchaseEndDate,
      categoryOptions,
      dialogOpen,
      displayFileList,
      errors
    } = this.state;

    const files = displayFileList.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Fragment>
        <Header />
        <Grid container spacing={8} className="add-tender-container internal">
          <Grid item sm={12} className="form-container">
            <h1>Create Tender</h1>
          </Grid>
          <Grid item sm={12} className="form-container">
            <div className="subtitle">Tender Reference</div>
            <TextField
              margin="dense"
              id="name"
              label="Tender Reference"
              fullWidth
              name="name"
              error={errors.name}
              helperText={errors.name}
              value={name}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item sm={12} className="form-container">
            <div className="subtitle">Tender Description</div>
            <TextField
              margin="dense"
              id="description"
              label="Tender Description"
              fullWidth
              name="description"
              error={errors.description}
              helperText={errors.description}
              value={description}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item sm={12} className="form-container">
            <div className="subtitle">Tender Brief</div>
            <TextField
              margin="dense"
              id="brief"
              label="Tender Brief"
              fullWidth
              name="brief"
              multiline={true}
              error={errors.brief}
              helperText={errors.brief}
              value={brief}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item sm={12} className="form-container">
            <div className="subtitle">Service Category</div>
            <ul className="inline-spread-list">
              {categoryOptions.map(option => (
                <li key={option}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.onServiceChecked}
                        value={option}
                      />
                    }
                    label={option}
                  />
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item sm={12} className="form-container">
            <div onClick={this.onStartUpload}>
              <div className="subtitle">RFP Documents</div>
              <div className="pdf-uploader-container">
                <div className="pdf-item">
                  <i className="material-icons">note_add</i>
                </div>
              </div>
              <div className="subtitle uploaded-documents">
                Uploaded Documents
              </div>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{files}</ul>
            </div>
          </Grid>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid item sm={12} className="select-container">
              <div className="form-subtitle">RFP Purchase Due Date</div>
              <ul className="inline">
                <li>
                  <div className="picker">
                    <MuiThemeProvider theme={materialTheme}>
                      <DatePicker
                        label="Start Date"
                        value={rfpPurchaseStartDate}
                        disablePast
                        className="custom-datepicker"
                        format="DD/MM/YYYY"
                        onChange={value =>
                          this.setState({ rfpPurchaseStartDate: value })
                        }
                      />
                    </MuiThemeProvider>
                  </div>
                </li>
                <li>
                  <div className="picker">
                    <MuiThemeProvider theme={materialTheme}>
                      <DatePicker
                        label="End Date"
                        value={rfpPurchaseEndDate}
                        disablePast
                        className="custom-datepicker"
                        format="DD/MM/YYYY"
                        onChange={value =>
                          this.setState({ rfpPurchaseEndDate: value })
                        }
                      />
                    </MuiThemeProvider>
                  </div>
                </li>
              </ul>
            </Grid>
            <Grid item sm={12} className="select-container">
              <div className="form-subtitle">RFP Response Due Date</div>
              <ul className="inline">
                <li>
                  <div className="picker">
                    <MuiThemeProvider theme={materialTheme}>
                      <DatePicker
                        label="Start Date"
                        value={rfpResponseStartDate}
                        disablePast
                        className="custom-datepicker"
                        format="DD/MM/YYYY"
                        onChange={value =>
                          this.setState({ rfpResponseStartDate: value })
                        }
                      />
                    </MuiThemeProvider>
                  </div>
                </li>
                <li>
                  <div className="picker">
                    <MuiThemeProvider theme={materialTheme}>
                      <DatePicker
                        label="End Date"
                        value={rfpResponseEndDate}
                        disablePast
                        format="DD/MM/YYYY"
                        className="custom-datepicker"
                        onChange={value =>
                          this.setState({ rfpResponseEndDate: value })
                        }
                      />
                    </MuiThemeProvider>
                  </div>
                </li>
              </ul>
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item sm={12}>
            <div className="cta-actions">
              <Button
                color="primary"
                variant="outlined"
                onClick={this.onGoBack}
              >
                Back
              </Button>
              <Button className="btn-secondary" onClick={this.onSubmit}>
                Create
              </Button>
            </div>
          </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={this.onUploadClose}>
          <DialogContent>
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="container">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                  </aside>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => this.setState({ dialogOpen: false })}
                  >
                    Close
                  </Button>
                </section>
              )}
            </Dropzone>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profileList: state.profiles.profileList
});

const actions = {
  addTender,
  uploadFiles,
  addNotification,
  getProfiles,
  getNotifications
};

export default connect(
  mapStateToProps,
  actions
)(AddTender);
