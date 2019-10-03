const readFiles = (files) => {
  return Promise.all(
    [].map.call(files, file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({result: reader.result, file});
        };
        reader.readAsDataURL(file);
      });
    })
  ).then(results => {
    return results;
  });
}

export default readFiles;
