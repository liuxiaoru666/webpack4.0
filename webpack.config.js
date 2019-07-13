const path = require('path');

module.exports =  {
    mode:'development',//development时打包文件不压缩，production时压缩
    entry:'./src/index.js',//入口
    output:{//打包路径
        filename:'bundle.js',
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
                        importLoaders:2, //scss文件引入scss也走全部cssloader
                        // modules:true//开启css模块化打包
                       }
                    },//style-loader挂载css到head
                   //处理css关系生成文件
                    'sass-loader',
                    'postcss-loader'//
                ] 
            },
            {//打包字体
                test:/\.(svg|eot|ttf|woff2?)(\?.*)?$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath:'./static/font/'
                    }

                   }
                },
        ]
    }
}