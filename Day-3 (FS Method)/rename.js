const fs = require('fs')

fs.rename('example.txt', 'renamed.txt', (err) => {
    if (err) throw err;
    console.log('File Renamed ')
}) 