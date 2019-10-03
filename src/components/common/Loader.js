import React from 'react';
const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-gif" />
      <span className="loader-label">
        Processing
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </span>
    </div>
  );
};
export default Loader;
