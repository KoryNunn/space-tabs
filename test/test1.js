function dooby(x){
    return x * 2;
}

module.exports = function(y){
    for(var i = 0; i < 100; i ++){
        console.log(dooby(i * y));
    }
};