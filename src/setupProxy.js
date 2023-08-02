const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/getProducts', {
      target:'https://vlisirmsp6lodfmlnaagbsef4a0yidnn.lambda-url.ap-northeast-2.on.aws/',
      changeOrigin: true,
    }),
  );
};
