const info = text => {
  // eslint-disable-next-line no-console
  console.info('INFO', text);
  return text;
};

const error = text => {
  // eslint-disable-next-line no-console
  console.error('ERROS', text);
  return text;
};

module.exports.info = info;
module.exports.error = error;

// Exportación global
// module.exports = { info, error };
