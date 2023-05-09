const fs = require('fs');
const path = require('path');

const p = (__dirname);
const style = p + '/project-dist/style.css';
const template = p + '/project-dist/index.html';

async function createDir(dir) {
    fs.stat(dir, function (err) {
        if (!err) {
            return;
        } else if (err.code === 'ENOENT') {
            fs.mkdir(dir, err => {
                if (err) throw err;
            });
        }
    });
}

async function createProjectDir(){
    await createDir(p + '/project-dist');
    await createDir(p + '/project-dist/assets');
}

createProjectDir()

try {
    fs.readdir(p + '/assets', (err, dirs) => {
        if (err) throw err;
        for (const dir of dirs) {
            createDir(p + '/project-dist/assets/' + dir).then(r => {
                fs.readdir(p + '/assets/' + dir, (err, files) => {
                    if (err) throw err;
                    for (const file of files) {
                        fs.copyFile(p + '/assets/' + dir + '/' + file, p + '/project-dist/assets/' + dir + '/' + file, err => {
                            if (err) throw err;
                        });
                    }
                });
            });
        }
    });
} catch (err) {
    console.error(err);
}

async function createFile(file) {
    await fs.writeFile(file, '', () => {});
}

async function checkFile(file) {
    fs.stat(file, function (err) {
        if (err == null) {
            return;
        } else if (err.code === 'ENOENT') {
            createFile(file);
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

async function createProjectFiles() {
    await checkFile(template);
    await checkFile(style);
}

createProjectFiles()

async function buildPage() {
    try {
        const files = await fs.promises.readdir(p + '/styles');
        for (const file of files) {
            if (path.extname(file) === '.css') {
                let readStream = fs.ReadStream(p + '/styles/' + file, 'utf-8');
                readStream.on('data', text => {
                    fs.writeFile(p + '/project-dist/style.css', '', (err) => {
                        if (err) console.log(err);
                    });
                    fs.appendFile(p + '/project-dist/style.css', text, err => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }
        }
    } catch (err) {
        console.error(err);
    }

    try {
        const readStream = fs.ReadStream(p + '/template.html', 'utf-8');
        readStream.on('data', text => {
            fs.readdir(p + '/components', (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    const readStream = fs.ReadStream(p + '/components/' + file, 'utf-8');
                    readStream.on('data', html => {
                        let repl = '{{' + file.replace('.html', '') + '}}';
                        text = text.replace(repl, html);
                        fs.writeFile(p + '/project-dist/index.html', text, (err) => {
                            if (err) console.log(err);
                        });
                    });
                }
            });
        });
    } catch (err) {
        console.error(err);
    }
}

buildPage();