
module.exports = {
    devServer: {
        open: true, // auto open brower 项目启动后自动打开浏览器...
        disableHostCheck: false,
        host: "localhost",
        port: 8080, // 修改端口号
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {     // string | Object 解决跨域问题
            '/api': {
                target: 'http://10.40.1.67:9966/v1', // 对应自己的 跨域地址 即请求的后端地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}