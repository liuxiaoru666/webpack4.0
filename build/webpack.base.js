const path = require('path');
//HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，打包生成的js自动引入html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//CleanWebpackPlugin打包开始时先删除之前的打包文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//plugin 在webpack打包过程中做一些事情（类似生命周期函数）

//打包分析图表
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');

module.exports =  {
    context: path.resolve(__dirname, '../'),//设置相对路径参照
    entry:{
        main:'./src/index.js'
        
        // sub:'./src/index.js'//打包多个js
    },//入口
    output:{//打包路径
        // publicPath:'/',//可以写cdn地址
        filename:'[name].js',
        chunkFilename:"[name].chunk.js",
        path:path.resolve(__dirname,'../dist')
    },
    optimization:{
        usedExports:true,//开发环境treeShaking配置(注意package.json配置sideEffects),生产环境不需要
        splitChunks:{
           chunks:'all'//代码分割配置
        }
    },
    module:{//配置loader(打包非.js结尾文件，webpack自己只能打包js文件)
        rules:[
          {//打包图片文件
            test:/\.(jpe?g|png|webp|gif|svg)$/,
            use:{
                loader:'url-loader', 
                options:{
                    //placeholder 占位符
                    //[name] 原始文件名  [ext]原始文件后缀 
                    limit:5120,//图片小于5kb打包base64到bundle.js
                    name:'[name]_[hash:7].[ext]',
                    outputPath:'./static/images/'
                }
               }
            },
            {
                test:/\.(svg|eot|ttf|woff2?)(\?.*)?$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath:'./static/fonts/'
                    }

                   }
                },
                { 
                    test: /\.js$/,
                     exclude: /node_modules/, //忽略第三方文件编译
                     loader: "babel-loader"
                 }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
        filename:'index.html',
        template:'index.html'
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ]
}