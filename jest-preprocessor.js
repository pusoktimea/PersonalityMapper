const babel = require('babel-core');
require('babel-register');

module.exports = {
  process: function(src, path) {
    if (path.match(/\.(s?css|gif|ya?ml|png|svg)/)) {
      return '';
    }
    if (path.indexOf('node_modules') === -1 &&
      babel.util.canCompile(path)) {
      return babel.transform(src, {
        auxiliaryCommentBefore: ' istanbul ignore next ',
        filename: path,
        retainLines: true
      }).code;
    }
    return src;
  }
};
