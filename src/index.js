//全局样式
import './static/css/common.scss';
import './style.css';
//引入图片
import logo from './static/images/logo.jpg';



//代码分割
//同步代码分割，在config配置
// import _ from 'lodash';

// 异步代码分割，无需配置，自动分割
async function getLodash(){
    const {default:_}= await import (/* webpackChunkName:"lodash"*/'lodash');
    return _;
}
getLodash().then((res)=>{
    console.log(res.join([2,3,4],"**"))
});


document.addEventListener('click',()=>{
    //maigic注释语法，webpackPrefetch空闲加载js文件
    import(/*webpackPrefetch:true*/'./click.js').then(({default:func})=>{
        func()
    })
})
