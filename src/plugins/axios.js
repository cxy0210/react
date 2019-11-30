import React from 'react';
import axios from 'axios';
import store from './redux';

// import pubsub from 'pubsub-js'

//添加一个请求的拦截
axios.interceptors.request.use(function (config) {

  // pubsub.publish('UPDATE_LOADING',true)
 //发布
 store.dispatch({type:'VIEW_LOADING',payload:true});
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应的拦截
axios.interceptors.response.use(function (response) {

  store.dispatch({type:'VIEW_LOADING',payload:false});

  return response;
  // pubsub.publish('UPDATE_LOADING',false)
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


React.axios = axios;//实例属性
// window.axios = axios; //全局API

export default axios;