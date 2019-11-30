import React from 'react';
import '../assets/css/Login.css';
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import { Link } from 'react-router-dom';
import store from '../plugins/redux';
import {checkUser,LOGIN} from '../store/actions'
import {connect} from 'react-redux'
export default class Login extends React.Component{

  state={

    username:'',
    password:'',
    mess:''

  };
  
  render(){
    // let {login} = this.props;
    return(
      <div className="content">
        <p className="fhbtn"><a onClick={()=>this.props.history.go(-1)}></a></p>
        <h1 id="h1"></h1>
        <div className="login-box">
          <p className="lsolid"></p>
          <div className="login">

            <Link to="/login">登录</Link>
            <span></span>
            <Link to="/reg">注册</Link>
          </div>
          <p className="rsolid"></p>
        </div>
        <ul>
          <Input
            name="username"
            type="text"
            label="账号"
            value={this.state.username}
            onChange={this.changeIpt}
          />
          <Input name="password" 
            type="password" 
            label="密码" 
            value={this.state.password}  
            onChange={this.changeIpt} 
          />
          <li>{this.state.mess}</li>
        </ul>
        <div className="footbox">
        <Button value="登录" clickHanlder={this.login}>登录</Button>
          {/* <Button value="登录" clickHanlder={()=>login(this.state.username,this.state.password,this)}>登录</Button> */}
          {/* <Button type="primary" size='small' className='form-login'  onClick={()=>login(this.state.username,this.state.password,this)}>登录</Button> */}
          <a href="#" className="tishi">忘记密码？</a>
        </div>
      </div>
    )
  }
  changeIpt=(ev)=>{
    // console.log('login changeIpt',ev.target)
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };
//   reg=()=>{
//     console.log(123,this.props);
//     this.props.history.push('/reg')
// };
login = () => {
  console.log('login',this.state.username, this.state.password)
  store.dispatch(checkUser({
    api:'login',
    method:'post',
    username:this.state.username,
    password:this.state.password,
    
  })).then(
    data=>{
      console.log( this.props,this.state.username,this.state.password);
      if (data.err===1){
        this.setState({mess:data.msg})
      } else {
        window.localStorage.setItem('react_news_app_uid',JSON.stringify(data));
        console.log(this.props)
        this.props.history.push('/user')
      }
      
    }
  )
  
}

}
// const initMapDispatchToProps = (dispatch) => {
//   console.log(1);
//   return {
    
//     login: (username,password,_this)=>{
//       console.log(1);
//         LOGIN(dispatch,username,password).then((res)=>{
//             dispatch({type:'USER_GOODS',payload:res.data.data.data});
//             _this.setState({
//                 username: "",
//                 password: ""
//             });
//             _this.props.history.push('/user')
             
//         })
//     }
//   }
// };
// export default connect(null,initMapDispatchToProps)(Login);
