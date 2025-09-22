const fs = require('fs')

fs.rmdir('newFolder', (err) => {
    if (err) throw err;
    console.log('Folder Deleted !')
})