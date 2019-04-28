'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const utils = require('../inc/utils');

const defaults = {
    'win32': {
        'initialDirectory': '::{20D04FE0-3AEA-1069-A2D8-08002B30309D}', // "This PC"
        'filter': 'All files (*.*)|*.*',
        'title': 'Open',
        'showHelp': true,
        'multiselect': false,
    },
    'darwin': {},
    'linux': {},
};

function OpenFileDialog(options) {
    if (!new.target) {
        throw new Error('OpenFileDialog must be initialised as a \'new\' instance!');
    }

    this.isOpen = false;

    let settings = utils.deepExtend({}, defaults, options);

    let templatePath = __dirname + path.sep + '..' + path.sep + 'templates' + path.sep;
    let templateFile = process.platform + '_open_file_dialog.tpl';
    let dialogTemplate = fs.readFileSync(templatePath + templateFile, { 'encoding': 'utf-8' });
    let dialogConfig = settings[process.platform];

    this.dialogCode = dialogTemplate;
    for (let key in dialogConfig) {
        let value = dialogConfig[key];
        let searchKey = '%' + key + '%';
        this.dialogCode = this.dialogCode.replace(
            new RegExp(searchKey, 'g'), value
        );
    }
};

OpenFileDialog.prototype.open = function(callback) {
    if (typeof callback === 'undefined') {
        console.log('Callback is missing for OpenFileDialog.open');
        callback = function(){};
    }

    if (this.isOpen) {
        throw new Error('This instance of OpenFileDialog is already opened!');
    }

    this.isOpen = true;

    let tempFile = utils.generateTempFile();
    fs.writeFileSync(tempFile, this.dialogCode, { 'mode': 0o766 });

    exec(tempFile, (error, stdout, stderr) => {
        this.isOpen = false;
        this.cleanup(tempFile);

        if (error) {
            console.error(`exec error: ${error}`);
            callback(error, null);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            console.error(`stdout: ${stdout}`);
            callback(stderr, stdout);
            return;
        }

        let folder = stdout.trim();
        callback(null, folder);
    });
};

OpenFileDialog.prototype.cleanup = function(tempFile) {
    fs.unlink(tempFile, (err) => {
        if (err) { console.log(err); }
    });
};

module.exports = OpenFileDialog;
