import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core/';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

class ProgressChart extends Component {
  render() {
    let percentage;
    const { width, number, total, color, title } = this.props;
    percentage = (100 / total) * number;
    return (
      <Fragment>
        {title && (
          <Typography variant="h5" className="text-center pb-3">
            {title}
          </Typography>
        )}
        <div style={{ maxWidth: `${width}px`, margin: 'auto' }}>
          {total && (
            <CircularProgressbar
              percentage={percentage}
              text={`${number}/${total}`}
              styles={{
                path: { stroke: `#${color}` },
                text: { fill: '#333' }
              }}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

ProgressChart.propTypes = {
  width: PropTypes.number.isRequired,
  number: PropTypes.number,
  total: PropTypes.number,
  color: PropTypes.string.isRequired,
  title: PropTypes.string
};

ProgressChart.defaultProps = {
  width: 100,
  color: 'c6ab6e'
};

export default ProgressChart;
