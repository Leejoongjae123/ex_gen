const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/getProducts', {
      target:'//43.201.149.234/',
      changeOrigin: true,
    }),
  );
};
