'use strict';

require('./inc/compatibility').check();

const OpenFileDialog = require('./lib/OpenFileDialog');
const OpenFolderDialog = require('./lib/OpenFolderDialog');
const SaveFileDialog = require('./lib/SaveFileDialog');

module.exports = {
    OpenFileDialog,
    OpenFolderDialog,
    SaveFileDialog
};
