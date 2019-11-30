import React from 'react';
import ReactDOM from 'react-dom';
import App from "./layouts/App";

//引入通用样式
import './assets/css/base.css';
import './assets/js/font'
//引入路由
import { BrowserRouter ,Route} from 'react-router-dom';

//引入axios的配置
import './plugins/axios';

import store from './plugins/redux';
import { Provider } from 'react-redux';

React.baseUrl = 'http://localhost:3000';//√  配置服务器基础链接
React.Component.prototype.baseUrl='http://localhost:3000';


// 取stroange同步状态管理
let local = window.localStorage.getItem('react_news_app_uid');
if (local){
  store.dispatch({type:'CHECK_USER',payload:JSON.parse(local)})
}
let cartList = window.localStorage.getItem('react_goods');
if(cartList){
  store.dispatch({type:'ADD_SHOPCAR',payload:JSON.parse(cartList)})
}
//
let price = window.localStorage.getItem('react_price');
if(price){
  store.dispatch({type:'TOTAL',payload:JSON.parse(price)})
}
ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>
    
    ,
document.getElementById('root'));


