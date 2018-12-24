import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render(){
        return (
            <div className='loginBg'>
                <div className='panel'>
                <h2>零待办 · 清单利器</h2>
                <form ref={this.loginForm} className='loginForm' onSubmit={this.login}>
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
                    <Link to='/resetPass'>忘记密码？</Link>
                    <Link to='/register'>没有账号，去注册</Link>
                </div>
            </div>
            </div>
            
        )
    }
    
}