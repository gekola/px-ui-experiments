var config = {};

['UAA_SERVER_URL', 'CLIENT_ID', 'CLIENT_SECRET'].forEach(function(v) {
  config[v] = process.env[v];
});

module.exports = config;
