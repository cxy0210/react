import React from 'react';
import style from '../assets/css/User.module.css';
import store from '../plugins/redux';
// import {LOGOUT} from "../store/actions";
// import {connect} from "react-redux";
import { Toast } from 'antd-mobile';
export default class User extends React.Component{
  
  logout=()=>{
    React.axios({//通知后端删除cookie,token
      url:'/api/logout',
      method:'delete'
    }).then(
      res=>{
        if (res.data.err===0){
          Toast.success('注销成功',2)
          //清除localStorage和状态管理
          window.localStorage.removeItem('react_app');
          store.dispatch({type:'CLEAR_USER'});
          // console.log(1);
          setTimeout(()=>{
            this.props.history.push('/login')
        },2000)
        }
      }
    )
  };
  
  render(){
    let {data} = this.props;
  
    // console.log(data.icon);
    // let el = null ;
    return(
    //   if(!data === false){
    //   el=(
      <div className={style.content}>
        <div className={style.header}>
          <h2><img src={`${this.baseUrl}`+data.icon} alt=""/></h2>
          <div className={style['user-box']}>
            <a>{data.nikename}</a>
            <a  onClick={this.logout}>注销</a>
          </div>
          <ul className={style.clear}>
            <li>
              <span>{data.follow}</span>
              <p>订单</p>
            </li>
            <li>
              <span>{data.fans}</span>
              <p className={style.end}>好友</p>
            </li>
          </ul>
        </div>
        <div className={style.docList}>
          <ul>
            <li className={style['gk-text']}>
              <i></i>
              <p>会员福利</p>
              <b></b>
              
            </li>
            <li className={style['mm-text']}>
              <i></i>
              <p>我的优惠</p>
              <b></b>
              
            </li>
            <li className={style['cg-text']}>
              <i></i>
              <p>服务中心</p>
              <b></b>
              
            </li>
            <li className={style['sc-text']}>
              <i></i>
              <p>收藏夹</p>
              <b></b>
              
            </li>
            <li className={style.my_cz}>
              <i></i>
              <p>设置</p>
            </li>
          </ul>
        </div>
      </div>
    )
    //   );   
    // }else{
    //   el=<div>重新刷新网页</div>
    // }
    // return(
    //   el
    // )
  }
}
// const initMapStateToProps = (state) =>{
//   return{
//     userdata:state.userdata.data
//   }
// };
// const initMapDispatchToProps = (dispatch) =>{
//   return {
//     logout :()=>{
//       LOGOUT(dispatch).then(
         
//         (res)=>{
//           console.log(1);
//           dispatch({type:'USER_GOODS',payload:''});
//           console.log(res.msg);
//           // this.props.history.push('/login')
//         }
//       )
//     }
//   }
// }


// export default connect(initMapStateToProps,initMapDispatchToProps)(User)