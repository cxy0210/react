import axios from "axios";
import React from "react";
import {CHECK_USER,ADD_CART} from './types';
import {UPDATE_GOODS} from './types'
import store from "../plugins/redux";
// const LOGIN = (dispatch,username,password)=>{
//     return axios({
//         api:'/login',
//         params: {
//             username,
//             password
//         }
//     }).then(
//         (res)=> {
//             if(!res.data.err) {
//                 console.log('登录');
//                 window.localStorage.setItem('userdata',JSON.stringify(res.data));
//                 window.localStorage.setItem('usergoods',JSON.stringify(res.data.data.data));
//                 dispatch({type:'USER_DATA',payload:res.data});
//                 return {data: res.data}
//             }else{
//                 alert("用户或密码错误");
//                 return {data: []}
//             }

//         }
//     );
// };

// const LOGOUT=(dispatch)=>{
//     return axios({
//         url:'/api/logout',
//         method:"delete"
//     }).then(
//         (res)=>{
            
            
//             window.localStorage.removeItem('userdata');
//             window.localStorage.removeItem('usergoods');
//             dispatch({type:'USER_DATA',payload:{err:1,data:{username:"",time:"",follow:""}}});
//             // console.log(2);
//             return {msg: "注销成功"}
            
//         }
//     )
// }
// const upPublic = (dispatch,id,dataName)=>{
//     axios({
//         url:`/api/${dataName}/${id}`
//     }).then(
//         res=>{
//             console.log(res.data.data);
//             dispatch({type:'UPDATE_DETAIL',payload:res.data.data});
//         }
//     )
// };
const update = ({api,_page=1,type,id=null}) =>dispatch=>(
    axios({
        url:id ? `/mock/${api}/${id}`:`/mock/${api}`,
        params:{_page}
    }).then(
        res=>{
            dispatch({type,payload:res.data.data});
        }
    ).catch(
        err=>new Error(err)
    )
);

const checkUser = ({api,method='get',username,password})=>(dispatch,getState)=>(
    axios({
        url:`/api/${api}`,
        method,
        params:method === 'get' ? {username,password}:null,
        data:method === 'post' ? {username,password}:null,
    }).then(
        res=>{
            dispatch({type:CHECK_USER,payload:res.data});
            return res.data
        }
    )
);


export {update , checkUser}