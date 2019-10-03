const mimeTypes = {
  'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'pdf': 'pdf'
};

const getMimeType = (file) => {
  let base64ContentArray = file.split(',');
  const mimeType = base64ContentArray[0].match(/[^/][\w-+\d.]+(?=;|,)/)[0]
  return mimeTypes[mimeType];
}

export default getMimeType;
