const anchor = require("markdown-it-anchor")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_CDN_PATH : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://openapi-dev.spsspro.com:30815',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/',
                },
            }
        },
        open: true, //配置后自动启动浏览器
    },
    configureWebpack: {
        resolve: {
            extensions: ['.md'],
        },
        plugins: [
            // new BundleAnalyzerPlugin()
        ],
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
        }
    },
    chainWebpack(config) {
        config.module
            .rule('dotmd')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .options({
                ...(config.module.rules.get('vue').uses.get('vue-loader').get('options') || null)
            })
            .end()
            .use('vue-dotmd-loader')
            .loader('vue-dotmd-loader')
            .options({
                dest: false,
                wrapperName: 'vueMdWrapper',
                fileDemoTag: 'import:vue',
                markdown: {
                    options: {
                        html: true,
                        linkify: true,
                        typography: true,
                        init(md) {
                            md.use(require("markdown-it-imsize")) // 设置图片大小
                            md.use(anchor) // 设置标题锚点
                        },
                    }
                }
            })
            .end()

        config.plugin('html')
            .tap(args => {
                args[0].cdn = [
                    'https://s0.spsspro.com/lib/vue/2.6.11/vue.min.js',
                    'https://s0.spsspro.com/lib/vue-router/3.5.2/vue-router.min.js',
                    'https://s0.spsspro.com/lib/vuex/3.6.2/vuex.min.js',
                ]
                return args
            })
        // console.log(config.module.rule('babel'))
    }
}