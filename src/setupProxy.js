const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app =>
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eacp.energyaustralia.com.au',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/': '/codingtest/'
      }
    })
  );
