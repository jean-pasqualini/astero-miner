const LoggerLevelEnumPrivate = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
}

/**
 * @typedef {Object} LoggerLevelEnum
 * @property {'DEBUG'} DEBUG - Debugging level, for detailed information typically of use only when diagnosing problems.
 * @property {'INFO'} INFO - Informational level, to confirm that things are working as expected.
 * @property {'WARN'} WARN - Warning level, to indicate that something unexpected happened, or there may be a problem in the near future (e.g. ‘disk space low’).
 * @property {'ERROR'} ERROR - Error level, to indicate that the software has been unable to perform some function.
 */

/**
 * @type {LoggerLevelEnum}
 */
export const LogLevel  = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR"
}

const LogLevelMapConsole = {
    DEBUG: console.debug,
    INFO: console.info,
    WARN: console.warn,
    ERROR: console.error
}

/**
 */
export class Logger {

    /**
     * @param {LoggerLevelEnum} level
     */
    constructor(level, module) {
        this.module = module;
        this.level = level;
        this.level_priority = LoggerLevelEnumPrivate[this.level] || LoggerLevelEnumPrivate.DEBUG
    }

    getFormattedDate() {
        const now = new Date();

        return `${now.getMonth()}/${now.getUTCDate()}] - [${now.getHours()}h:${now.getMinutes()}min:${now.getSeconds()}s:${now.getMilliseconds()}ms`
    }

    /**
     * @param {LoggerLevelEnum} level
     */
    log(level, ...message) {
        const asked_level = LoggerLevelEnumPrivate[level] || LoggerLevelEnumPrivate.DEBUG

        if(this.level_priority <= asked_level) {
            const logMessage = `[${this.getFormattedDate()}] [${this.module}]  ${message.join(" ")}`
            console.log(logMessage)
        }
        
    }

    /**
     * @param {LoggerLevelEnum} level
     */
    logObject(level, ...message) {
        const asked_level = LoggerLevelEnumPrivate[level] || LoggerLevelEnumPrivate.DEBUG

        if(this.level_priority <= asked_level) {
            const logMessage = `[${this.getFormattedDate()}] [${this.module}]  ${message.join(" ")}`
            console.log({
                module: this.module,
                date: this.getFormattedDate(),
                datas: message
            })
        }
        
    }
}