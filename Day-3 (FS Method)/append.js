const { error } = require('console')
const fs = require('fs')

fs.appendFile('example.txt', '\nAppended Text !', (err) => {
    if (err) throw error;
    console.log('Data Appended !')
})