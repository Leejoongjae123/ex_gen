const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/378226211:runReport', {
      target:'https://content-analyticsdata.googleapis.com/v1beta/properties',
      changeOrigin: true,
    }),
  );
};
