'use strict';

const os = require('os');
const semver = require('semver');

module.exports = {
    check: function() {
        let platform = process.platform;
        let release = os.release();

        if (platform === 'win32') {
            if (!semver.satisfies(release, '>= 6.1')) {
                throw new Error('Error: Windows XP and Vista is not supported yet!');
            }
        }
        else if (platform === 'darwin') {
            // TODO: All supported (?)
        }
        else {
            throw new Error('This operating system (' + platform + ') is not supported yet.');
        }
    }
};
