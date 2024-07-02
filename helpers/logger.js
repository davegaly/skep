// logger.js
class Logger {

    static log(message) {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  
    static error(message) {
      console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    }
  
    static info(message) {
      console.info(`[${new Date().toISOString()}] INFO: ${message}`);
    }
  
    static warn(message) {
      console.warn(`[${new Date().toISOString()}] WARN: ${message}`);
    }

}
  
module.exports = Logger;  