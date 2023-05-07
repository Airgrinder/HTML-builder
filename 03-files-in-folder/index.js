const fs = require('fs');
const path = require('path');

const p = (path.join(__dirname + '/secret-folder'));

try {
    fs.readdir(p, { withFileTypes: true }, (err, files) => {
        for (const file of files) {
            if (file.isFile()) {
                fs.stat(p + '/' + file.name, (err, stats) => {
                    console.log('<' + Object.values(file) + '> - <' + path.extname(file.name) + '> - <' + (stats.size/1024).toFixed(2) + 'kb >');
                });
            }
        }
    });
} catch (err) {
    console.error(err);
}