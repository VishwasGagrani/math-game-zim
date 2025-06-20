const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'C:/xampp/htdocs/math-training/training/';
const isProduction = false; // Set to true for production mode

module.exports = {
  entry: {
    training: './src/index.js', // Entry point for the training bundle
       },
  output: {
    filename: (pathData) => {
     
      // Place training.bundle.js inside the training folder
      
        return '[name].bundle.js';
      
      
    },
    path: path.resolve(outputDir),
    publicPath: './',
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  optimization: {
    minimize: false, // Disable minification for development
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Add other loaders here if needed
    ],
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      title: 'Training',
      template: './public/index.php', // Use training/index.php as a template
      filename: 'index.php', // Output file
      inject: 'body', // Inject <script> tag before </body>
      
      scriptLoading: 'blocking',
      publicPath: './',
      minify: isProduction
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: path.resolve(outputDir),
          globOptions: {
            ignore: ['**/index.php'], // Avoid copying index.php twice
          },
        },
      ],
    }),
  ],
};