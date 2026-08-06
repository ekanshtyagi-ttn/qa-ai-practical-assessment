module.exports = {
  extension: ['js'],
  timeout: 90_000,
  slow: 30_000,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'execution-reports/mochawesome',
    reportFilename: 'index',
    overwrite: true,
    html: true,
    json: true,
    quiet: true,
  },
};
