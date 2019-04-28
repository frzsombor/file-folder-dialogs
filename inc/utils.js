'use strict';

const os = require('os');
const path = require('path');

const platformExtensions = {
    'win32': '.bat',
    'linux': '.sh',
    'darwin': '.sh',
}

module.exports = {

    deepExtend: function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = this.deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    },

    generateTempFile: function() {
        let tempFolder = os.tmpdir();
        let tempName = 'node_file_folder_dialog_' + Math.random().toString(32).slice(2);
        return tempFolder + path.sep + tempName + platformExtensions[process.platform];
    },

};
