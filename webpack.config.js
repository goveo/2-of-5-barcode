const path = require('path');

module.exports = {
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'src', 'Barcode.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          '/node_modules/',
        ],
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
};
