const fs = require('fs')

if (fs.existsSync('example.txt')) {
    console.log('File Exists !')
} else {
    console.log('File does not exists !')
}
