var glob = require("glob"),
    righto = require('righto'),
    fs = require('fs');

module.exports = function(pattern, fromType, fromCount, toString, callback){

    if(isNaN(fromCount) || fromCount < 1){
        throw 'Must specify how many whitespaces characters the files currently have';
    }

    var types = {
        tabs: '\\t',
        spaces: '[^\\S\\n]'
    };

    function convertFile(file, fromType, fromCount, toString){
        var regex = new RegExp(types[fromType] + '{' + fromCount + '}', 'g');

        return file.replace(regex, toString);
    }

    var fileNames = righto(glob, pattern);

    var filesConverted = fileNames.get(fileNames => righto.all(fileNames.map(function(fileName){
            var file = righto(fs.readFile, fileName, 'utf8');

            var convertedFile = righto.sync(convertFile, file, fromType, fromCount, toString);

            return righto.resolve({
                path: fileName,
                file: convertedFile
            });
        })));

    filesConverted(callback);
}