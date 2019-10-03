import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

class Brief extends Component {
  render() {
    const { tender } = this.props;
    return (
      <Fragment>
        <div className="text-right">
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </div>
        <Typography variant="h5">Tender Brief</Typography>
        <Typography variant="body1">{tender.brief}</Typography>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tender: state.tenders.tender
});

export default connect(mapStateToProps)(Brief);
