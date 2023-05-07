const fs = require('fs');
const path = require('path');
const readline = require('readline');

const road = path.join(__dirname, 'text.txt');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


function createFile() {
    fs.writeFile(road, '', () => {
    });
}

function isEmpty() {
    fs.stat(road, function (err) {
        if (err == null) {
            return;
        } else if (err.code === 'ENOENT') {
            createFile();
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

function writeFile() {
    isEmpty();
    console.log('--> Write your message');
    rl.on('SIGINT', function () {
        console.log('--> Bye');
        return rl.close();
    });
    rl.on('line', (text) => {
        if (text === 'exit') {
            console.log('--> Bye');
            return rl.close();
        }
        fs.appendFile(road, text, err => {
            if (err) {
                throw err;
            }
        });
    });
}

writeFile();
