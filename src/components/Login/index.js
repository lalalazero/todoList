import React, { Component } from 'react'
import { request } from './../../utils/request'
import './style.css'


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
           
        }
        this.form = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
    }

    login = (event) => {
        console.log('submit')
        let username = this.username.current.value
        let password = this.password.current.value;
        console.log('username ', username, 'password ', password);
        event.preventDefault();
        request('login',{
            body: {
                'username': username,
                'password': password,
            },
            method: 'POST'
        }).then(res => {
            console.log(res);
            res.status === 0 ? alert('登陆成功') : alert('登录失败... ', res.msg)
        })
    }

    render(){
        return(
            <div className='loginBg'>
                <div className='loginPanel'>
                    <h2>零待办 · 清单利器</h2>
                    <form ref={this.form} className='loginForm' onSubmit={this.login}>
                        <div className='login-row'>
                            <input ref={this.username} type='text' placeholder='用户名或者邮箱'></input>
                        </div>
                        <div className='login-row'>
                            <input ref={this.password} type='password' placeholder='密码'></input>
                        </div>
                        <div className='login-row loginBtn'>
                            <input type='submit' value='登录'></input>
                        </div>
                    </form>
                    <div className='loginOptions'>
                        <a href='/resetPass'>忘记密码？</a>
                        <a href='/register'>没有账号，去注册</a>
                    </div>
                </div>
            </div>
        )
    }
}