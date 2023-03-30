const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/node",
        createProxyMiddleware({
            target: "http://127.0.0.1:3333/",
            changeOrigin: true,
            pathRewrite: {
                '^/node': ''
            }
        })
    );
    app.use(
        "/py",
        createProxyMiddleware({
            target: "http://127.0.0.1:5000/",
            changeOrigin: true,
            pathRewrite: {
                '^/py': ''
            }
        })
    );
};
