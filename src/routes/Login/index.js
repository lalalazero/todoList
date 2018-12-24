import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { request } from '../../utils/request'
import { message } from 'antd'
import PropTypes from 'prop-types'

export default class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context){
        super(props, context)
        this.state = {

        }
        this.loginForm = React.createRef()
        this.username = React.createRef()
        this.password = React.createRef()
    }
    login = (e) => {
        e.preventDefault()
        request('/login',{
            body: {
                username: this.username.current.value,
                password: this.password.current.value
            },
            method: 'POST'
        }).then(res => {
            if(res.status === 0){
                // 跳转到 Home 页
                message.success('登陆成功')
                this.context.router.history.push('/home')
            }else{
                message.error('登陆失败')
            }
        })
    }
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