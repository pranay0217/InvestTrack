const { createLogger, format, transports } = require('winston');

// Create a logger for error logs
const errorLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(info => {
      let logMessage = `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`;
      if(info && info.response && info.response.config && info.response.config.url) {
        logMessage += ` - Request URL : ${info.response.config.url}`;
      }
      if (info && info.response && info.response.config && info.response.config.headers) {
        logMessage += ` - Request Headers : ${JSON.stringify(info.response.config.headers)}`;
      }
      if (info && info.response && info.response.config && info.response.config.data) {
        logMessage += ` - Request Data : ${JSON.stringify(info.response.config.data)}`;
      }

      if (info && info.response && info.response.data) {
        logMessage += ` - Response Data : ${JSON.stringify(info.response.data)}`;
      }else{
        logMessage += ` - Response Data : ${info.response}`;
      }
      return logMessage;
    })
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});


module.exports = {
  errorLogger
}