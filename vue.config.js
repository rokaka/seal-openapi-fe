const anchor = require("markdown-it-anchor")
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_CDN_PATH : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://openapi-uat.spsspro.com',
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
                        notWrapper: true,
                        init(md) {
                            md.use(require("markdown-it-imsize")) // 设置图片大小
                            md.use(anchor) // 设置标题锚点


                        },
                    }
                }
            })
            .end()
            .use('markdownloader')
            .loader(path.resolve(__dirname, './src/assets/loader/md-loader.js'))
            .end()

        config.plugin('html')
            .tap(args => {
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = [
                        'https://s0.spsspro.com/lib/vue/2.6.11/vue.min.js',
                        'https://s0.spsspro.com/lib/vue-router/3.5.2/vue-router.min.js',
                        'https://s0.spsspro.com/lib/vuex/3.6.2/vuex.min.js',
                    ]
                }

                args[0].title = 'API开放平台-SPSSPRO-免费专业的在线数据分析平台'
                args[0].meta = {
                    description: 'SPSSPRO API开放平台是关于数据分析工具软件的API开发接口介绍,介绍了各种接口的使用与权限。',
                    keywords: 'spss、api、数据分析服务、机器学习、开发文档'
                }
                return args
            })
        if (process.env.NODE_ENV === 'production') {
            config.externals({
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
            })
        }
    }
}