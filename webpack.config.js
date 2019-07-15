const path = require('path');
//HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，打包生成的js自动引入html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//CleanWebpackPlugin打包开始时先删除之前的打包文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//plugin 在webpack打包过程中做一些事情（类似生命周期函数）
const webpack = require('webpack');

module.exports =  {
    mode:'development',//development时打包文件不压缩，production时压缩
    devtool:'cheap-module-eval-source-map',//开发映射关系最佳实践
    // devtool:'cheap-module-source-map',//线上最佳实践
    devServer:{
        contentBase:'./dist',
        open:true,//autoOpenBroser
        port:8080,
        hot:true,//开启HMR模块热替换
        hotOnly:true//浏览去不自动刷新
    },
    entry:{
        main:'./src/index.js',
        // sub:'./src/index.js'//打包多个js
    },//入口
    output:{//打包路径
        // publicPath:'/',//可以写cdn地址
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
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
                    'postcss-loader'//
                ] 
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
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
                     exclude: /node_modules/, 
                     loader: "babel-loader",
                     options:{
                        "presets": [["@babel/preset-env",{useBuiltIns:'usage'}]]
                     }
                 }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
        filename:'index.html',
        template:'index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}