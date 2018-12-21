const path = require('path');

const LOG_DIR = 'logs';

const log4jsConfig = {
    appenders: {
        errorAppender: {
            type: 'file',
            filename: path.join(LOG_DIR, '/error.log')
        },
        infoAppender: {
            type: 'file',
            filename: path.join(LOG_DIR, '/info.log')
        }
    },
    categories: {
        default: {
            appenders: ['infoAppender'],
            level: 'info'
        },
        error: {
            appenders: ['errorAppender'],
            level: 'error'
        }
    }
};

module.exports = {
    config: log4jsConfig,
    LOG_DIR,
};