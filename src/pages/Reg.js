import React from 'react';
import '../assets/css/Reg.css';
import {Link} from 'react-router-dom';
import Input from '../components/input/Input';
import Button from '../components/button/Button';


export default class Reg extends React.Component {

    state = {
        username: '',
        password: '',
        mess: ''
    };

    reg = () => {
        React.axios({
            url: '/mock/reg',
            method: 'post',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(
            res => {
                if (res.data.err === 1) {
                    this.setState({ mess: res.data.msg })
                } else {
                    alert('注册成功');
                    this.props.history.push('/login')
                }
            }
        )
    };

    changeIpt = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    };

    render() {
        return (
            <div className="Reg">
                <div className="content">
                    <p className="fhbtn"><a onClick={() => window.history.go(-1)}></a></p>
                    <h1></h1>
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
                        <Input name="username" value={this.state.username} onChange={this.changeIpt} label="账号" />
                        <Input type="password" name="password" value={this.state.password} onChange={this.changeIpt} label="密码" />
                        <li>{this.state.mess}</li>
                    </ul>
                    <div className="footbox">
                        <Button value="注册" clickHanlder={this.reg} />
                        <a href="#" className="tishi">忘记密码？</a>
                    </div>
                </div>
            </div>
        )
    }
}