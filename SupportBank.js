
console.log('Welcome to SupportBank\n \n');
let readlineSync = require('readline-sync');
var logger;
const supportedFileFormats = ['csv','son','xml'];
const log4js = require('log4js')
const fileProgress = require('./Parser')
const display = require('./Display')

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

function logProgress(file) {
    logger = log4js.getLogger(file);
    logger.info('File',file,'is being loaded.');
}

function readFile() {
    var fileName = readlineSync.question('Name of the file to be loaded? \n');
    let fileFound = false;
    logProgress(fileName);
    let breakCommand = false;
    while (!fileFound && !breakCommand) {
        let fs = require('fs');
        var temp = fileName;
        var extension = fileName.slice(fileName.length - 3, fileName.length);
        if ((fs.existsSync(fileName)) && (supportedFileFormats.indexOf(extension) !== -1)) {
           fileFound = true;
           inputData = fs.readFileSync(temp,'utf8');
           fileProgress.progressFile(inputData, extension);
           console.log('The file has been added');
        }
        else {
            if (supportedFileFormats.indexOf(extension) === -1) {logger.error('Unsupported file format! (',extension,')');}
            else {  logger.error('File not found at \n', fileName); }
            fileName = readlineSync.question('Provide valid fileame or type stop \n');
        }
        
        if (fileName === 'stop') {
            breakCommand = true;
        }
    }
    main();
}

function main() {
    let compile = false;
    var action;
    while (compile === false) {
        action = readlineSync.question('Would you like to extend the database or list data? (y/n) (List All, List Account)\n');
        if ((action === 'y') || (action === 'n')) {
            compile = true;
        } else {
            if (action.slice(0,4) === 'List') {
                if (action.slice(4,8) === ' All') {
                    console.log('testing displayAll');
                    display.displayAll();
                } else {
                    var cAccount = action.slice(5,action.length)
                    display.displayAccount(cAccount);
                }
            } else {console.log('invalid input \n');}
        }
        
    }
    if (action === 'y') {
        readFile();
    } else { if (action === 'n') {console.log('Bye bye\n');}}
}

main();