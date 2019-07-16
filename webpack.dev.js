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
    optimization:{//开发环境treeShaking配置(注意package.json配置sideEffects),生产环境不需要
        usedExports:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig,devConfig);