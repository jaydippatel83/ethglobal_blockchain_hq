// webpack.config.js
module.exports = { 
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    ]
  };
  