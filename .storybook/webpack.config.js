const path = require('path');

module.exports = (storybookBaseConfig, configType) => {
  if (configType === 'PRODUCTION') {
    // Removing uglification until we figure out a fix for that.
    storybookBaseConfig.plugins.pop();
  }
  storybookBaseConfig.module.rules.push({
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });
  storybookBaseConfig.module.rules.push({
    test: /\.(png|svg|jpg|gif|eot|otf|webp|svg|ttf|woff|woff2)$/,
    use: ['file-loader']
  });
  return storybookBaseConfig;
};
