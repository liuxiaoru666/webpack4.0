
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const proConfig =  {
    mode:'production',//development时打包文件不压缩，production时压缩
    devtool:'cheap-module-source-map'//开发映射关系最佳实
}
module.exports = merge(baseConfig,proConfig);