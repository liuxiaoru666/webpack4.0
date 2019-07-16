import '@babel/polyfill';
//全局样式
import './static/css/common.scss';
import './style.css';

//引入图片
import logo from './static/images/logo.jpg';

import React,{Component} from 'react';
import ReactDom from 'react-dom';
class App extends Component {
    render(){
        return(
            <div>Hello world</div>
        )
    }
}

ReactDom.render(<App/>,document.getElementById('root'));