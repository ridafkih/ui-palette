const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/src/script.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};