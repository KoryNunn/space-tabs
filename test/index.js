var test = require('tape'),
    convert = require('../convert');

test('spaces to spaces', function(t){
    convert('test/*.js', 'spaces', 4, '  ', console.log);
});

test('tabs to spaces', function(t){
    convert('test/*.js', 'tabs', 1, '    ', console.log);
});