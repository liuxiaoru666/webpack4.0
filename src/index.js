import '@babel/polyfill';
//全局样式
import './static/css/common.scss';
import './style.css';
//引入图片
import logo from './static/images/logo.jpg';
document.getElementById('root').innerHTML='<img src="'+logo+'" class="flex"/>'
