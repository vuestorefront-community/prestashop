import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: 'application.log' }
  },
  categories: { default: { appenders: ['out', 'app'], level: 'info' } }
});

const logger = log4js.getLogger();

export {
  logger
};
