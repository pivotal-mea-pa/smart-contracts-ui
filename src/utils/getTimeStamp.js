const getTimeStamp = date => {
  if (new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
    return `Today ${new Date(date).toLocaleTimeString()}`;
  } else {
    return (
      new Date(date).toLocaleDateString('en-gb') +
      ' ' +
      new Date(date).toLocaleTimeString()
    );
  }
};

export default getTimeStamp;
