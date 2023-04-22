'use strict';

const _ = require('lodash'),
    fileStreamRotator = require('file-stream-rotator'),
    fs = require('fs'),
    path = require('path');

// list of valid formats for the logging
const validFormats = ['combined', 'common', 'dev', 'short', 'tiny'];

// build logger service
const logger = {
    getFormat: getLogFormat, // log format to use
    getOptions: getLogOptions // log options to use
};

// export the logger service
module.exports = logger;

/**
 * The format to use with the logger
 *
 * Returns the log.format option set in the current environment configuration
 */
function getLogFormat() {
    var format = 'combined';

    // make sure we have a valid format
    if (!_.includes(validFormats, format)) {
        format = 'combined';
    }

    return format;
}

/**
 * The options to use with the logger
 *
 * Returns the log.options object set in the current environment configuration.
 * NOTE: Any options, requiring special handling (e.g. 'stream'), that encounter an error will be removed from the options.
 */
function getLogOptions() {
    var options = {
        // Stream defaults to process.stdout
        // Uncomment/comment to toggle the logging to a log on the file system
        stream: {
            directoryPath: process.cwd() + '/log/',
            rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
                active: true, // activate to use rotating logs 
                date_format: 'YYYYMMDD',
                fileName: path.join('access-%DATE%.log'),
                frequency: 'daily',
                verbose: 'false',
                audit_file: path.join('log-audit.json')
            }
        }
    }

    // check if the current environment config has the log stream option set
    if (_.has(options, 'stream')) {

        try {

            // check if we need to use rotating logs
            if (_.has(options, 'stream.rotatingLogs') && options.stream.rotatingLogs.active) {

                if (options.stream.rotatingLogs.fileName.length && options.stream.directoryPath.length) {

                    // ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fileStreamRotator.getStream({
                        filename: options.stream.directoryPath + '/' + options.stream.rotatingLogs.fileName,
                        frequency: options.stream.rotatingLogs.frequency,
                        verbose: options.stream.rotatingLogs.verbose
                    });

                } else {
                    // throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for the rotating logs option.');
                }

            } else {

                // create the WriteStream to use for the logs
                if (options.stream.rotatingLogs.fileName.length && options.stream.directoryPath.length) {

                    // ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fs.createWriteStream(options.stream.directoryPath + '/' + options.stream.rotatingLogs.fileName, { flags: 'a' });
                } else {
                    // throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for stream option.');
                }
            }
        } catch (err) {
            // remove the stream option
            delete options.stream;
            console.log();
            console.error('An error has occured during the creation of the WriteStream. The stream option has been omitted.');
            console.error(err);
            console.log();
        }
    }

    return options;
}
