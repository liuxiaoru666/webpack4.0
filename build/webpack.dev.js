const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const devConfig =  {
    mode:'development',//development时打包文件不压缩，production时压缩
    devtool:'cheap-module-eval-source-map',//开发映射关系最佳实践
    // devtool:'cheap-module-source-map',//线上最佳实践
    devServer:{
        contentBase:'./dist',
        open:true,//autoOpenBroser
        port:8080,
        hot:true,//开启HMR模块热替换
        // hotOnly:true//浏览去不自动刷新
    },
    module:{
        rules:[
            {//打包scss文件
                test:/\.scss$/,
                use:[
                    'style-loader',
                    {
                    loader: 'css-loader',
                    options:{
                        importLoaders:2, //scss文件引入其他scss也走全部cssloader
                        // modules:true//开启css模块化打包s
                       }
                    },//style-loader挂载css到head
                   //处理css关系生成文件
                    'sass-loader',
                    'postcss-loader'
                ] 
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig,devConfig);