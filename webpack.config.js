const path = require('path');

module.exports =  {
    entry:'./src/index.js',//入口
    output:{//打包路径
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}