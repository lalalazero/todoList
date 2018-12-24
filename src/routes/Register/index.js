import React, { Component } from 'react'


export default class Register extends Component {
    render(){
        return (
            <div className='loginBg'>
                <div className='panel'>
                    <h2>零待办 · 清单利器</h2>
                    <form ref={this.registerForm} className='loginForm' onSubmit={this.register}>
                        <div className='login-row'>
                            <input name='username' type='text' placeholder='用户名或者邮箱'></input>
                        </div>
                        <div className='login-row'>
                            <input name='password' type='password' placeholder='密码'></input>
                        </div>
                        <div className='login-row loginBtn'>
                            <input type='submit' value='注册'></input>
                        </div>
                    </form>
                    <div className='loginOptions'>
                        <a href='/#/login' >已有账号，去登录</a>
                    </div>
                </div>
            </div>
        )
    }
}