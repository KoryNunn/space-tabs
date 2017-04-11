#! /usr/bin/env node

var glob = require("glob"),
    righto = require('righto'),
    convert = require('./convert');

var pattern = process.argv[2],
    fromType = process.argv[3],
    fromCount = parseInt(process.argv[4]),
    toString = process.argv[5],
    fs = require('fs');

convert(pattern, fromType, fromCount, toString, function(error, convertedFiles){
    var writtenFiles = convertedFiles.map(convertedFile => righto(fs.writeFile, convertedFile.path, convertedFile.file));

    var result = righto.all(writtenFiles);

    result(function(error){
        if(error){
            return console.log(error);
        }

        console.log('Done');
    });
});