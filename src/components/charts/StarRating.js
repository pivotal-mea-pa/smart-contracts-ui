import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { StarBorderOutlined } from '@material-ui/icons';

class StarRating extends Component {
  // setRating = (value) => {

  // }
  render() {
    const { rating } = this.props;
    return (
      <Fragment>
        {rating >= 1 ? (
          <Icon color="secondary">grade</Icon>
        ) : (
          <StarBorderOutlined />
        )}
        {rating >= 2 ? (
          <Icon color="secondary">grade</Icon>
        ) : (
          <StarBorderOutlined />
        )}
        {rating >= 3 ? (
          <Icon color="secondary">grade</Icon>
        ) : (
          <StarBorderOutlined />
        )}
        {rating >= 4 ? (
          <Icon color="secondary">grade</Icon>
        ) : (
          <StarBorderOutlined />
        )}
        {rating === 5 ? (
          <Icon color="secondary">grade</Icon>
        ) : (
          <StarBorderOutlined />
        )}
      </Fragment>
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

StarRating.defaultProps = {
  rating: 0
};

export default StarRating;
