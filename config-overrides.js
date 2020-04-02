const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = function override(config, env) {
    config.resolve.alias = {
        'component': resolve('src/component'),
        'api': resolve('src/api'),
        'decoration': resolve('src/decoration'),
        'images': resolve('src/images'),
    }
    return config;
}