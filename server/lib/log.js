const log4js = require('log4js');

log4js.configure({
  pm2: true,
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: '-yyyy-MM-dd-hh',
      category: 'http',
    },
    app: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: 'logs/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
    console: {
      type: 'console',
      category: 'console',
    },
    stdout: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'DEBUG' },
    http: { appenders: ['access'], level: 'DEBUG' },
    debug: { appenders:['console', 'errors'], level: 'TRACE'},
  },
});

const logger = log4js.getLogger('debug');

module.exports = logger
