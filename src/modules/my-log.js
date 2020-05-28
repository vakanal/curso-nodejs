const info = (text) => {
  console.info("INFO", text);
  return text;
};

const error = (text) => {
  console.error("ERROS", text);
  return text;
};

module.exports.info = info;
module.exports.error = error;

// Exportación global
//module.exports = { info, error };
