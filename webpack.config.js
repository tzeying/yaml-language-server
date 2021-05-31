const path = require('path');
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /node_modules[\\|/](jsonc-parser|vscode-json-languageservice)/,
        use: 'umd-compat-loader' 
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "path": false,
      "buffer": false,
      "fs": false
    }
  },
  devtool: 'inline-source-map',
  plugins: [new dotenv()],
  output: {
    library: "yamlLangService",
    libraryTarget: 'umd',
    filename: 'bundle.js',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
  },
};