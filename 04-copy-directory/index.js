const fs = require('fs');
const path = require('path');

const p = (path.join(__dirname));

function isEmpty() {
    fs.stat(p + '/files-copy', function (err) {
        if (!err) {
        } else if (err.code === 'ENOENT') {
            fs.mkdir(p + '/files-copy', err => {
            });
        }
    });
}

isEmpty();

try {
    fs.readdir(p + '/files-copy', (err, files) => {

        if (files) {
            for (const file of files) {
                fs.unlink(p + '/files-copy/' + file, err => {
                    if (err) throw err;
                });
            }
        }


    });
    fs.readdir(p + '/files', (err, files) => {
        for (const file of files) {
            fs.copyFile(p + '/files/' + file, p + '/files-copy/' + file, err => {
                if (err) throw err;
            });
        }
    });
} catch (err) {
    console.error(err);
}