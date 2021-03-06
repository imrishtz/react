const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options: {
          presets: ["es2015"]
        },
      },
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
        ]
    },
    {
      test: /\.svg$/,
      use: [
        'file-loader',
        'svg-transform-loader',
      ]
    },
    {
      test: /\.jpg$/,
      use: [
        'file-loader',
      ]
    },
    {
      test: /\.png$/,
      use: [
        'file-loader',
      ]
    },
    ], 
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  plugins: process.argv.indexOf('-p') === -1 ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  ],
};
