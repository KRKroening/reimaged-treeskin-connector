var generateIds = function(prefix){
    return prefix.toUpperCase() + Math.random().toString(36).substring(7);
}

module.exports = generateIds