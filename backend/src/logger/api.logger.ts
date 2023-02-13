const pine = require('pine');

const logger = pine();


export class APILogger {

    info(message: String, data: any) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message: String) {
        logger.error(message);
    }
}