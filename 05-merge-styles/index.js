const fs = require('fs');
const path = require('path');


const p = __dirname;
const way = p + '/project-dist/bundle.css';

function createFile() {
    fs.writeFile(way, '', () => {
    });
}

function isEmpty() {
    fs.stat(way, function (err) {
        if (err == null) {
            return;
        } else if (err.code === 'ENOENT') {
            createFile();
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

isEmpty();

try {
    fs.readdir(p + '/styles', (err, files) => {
        for (const file of files) {
            if (path.extname(file) === '.css') {
                let readStream = fs.ReadStream(p + '/styles/' + file, 'utf-8');
                readStream.on('data', text => {
                    fs.writeFile(way, '', (err) => {
                        if (err) console.log(err);
                    });
                    fs.appendFile(way, text, err => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }
        }
    });
} catch (err) {
    console.error(err);
}
