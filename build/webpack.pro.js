
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
//css打包分割
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css代码压缩
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const proConfig =  {
    mode:'production',//development时打包文件不压缩，production时压缩
    devtool:'cheap-module-source-map',//开发映射关系最佳实
    module: {
        rules: [
          {//打包scss文件
            test:/\.scss$/,
            use:[
                MiniCssExtractPlugin.loader,
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
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
        }
        ],
      },

    optimization:{
       minimizer:[
        new OptimizeCssAssetsPlugin({})
       ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // all options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
        
      ]

}
module.exports = merge(baseConfig,proConfig);