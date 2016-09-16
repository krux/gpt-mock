require('babel-register');
var process = require('process'); // eslint-disable-line no-var

process.chdir('..');

module.exports = require('./karma-nocoverage.config.babel');
