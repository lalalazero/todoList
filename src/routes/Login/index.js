import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { request } from '../../utils/request'
import { message, Icon } from 'antd'
import PropTypes from 'prop-types'

export default class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context){
        super(props, context)
        this.state = {
            isloading: false,
            nameError: false,
            passError: false
        }
        this.loginForm = React.createRef()
        this.username = React.createRef()
        this.password = React.createRef()
    }
    login = (e) => {
        e.preventDefault()
        if(this.state.nameError || this.state.passError){
            return;
        }
        if(this.state.isloading){
            console.log('正在请求中..return')
            return;
        }
        this.setState({
            isloading: true
        })
        request('/login',{
            body: {
                username: this.username.current.value,
                password: this.password.current.value
            },
            method: 'POST'
        }).then(res => {
            this.setState({
                isloading: false
            })
            if(res.status === 0){
                // 跳转到 Home 页
                message.success('登陆成功')
                localStorage.setItem('userId',res.data)
                this.context.router.history.push('/home')
            }else{
                message.error(res.msg)
            }
        })
    }

    checkName = () => {
        if(this.username.current.value.trim() === ''){
            this.setState({
                nameError: true
            })
        }else{
            this.setState({
                nameError: false
            })
        }
    }
    checkPass = () => {
        if(this.password.current.value.trim() === ''){
            this.setState({
                passError: true
            })
        }else{
            this.setState({
                passError: false
            })
        }
    }
    render(){
        return (
            <div className='loginBg'>
                <div className='panel'>
                    <h2>零待办 · 清单利器</h2>
                    <form ref={this.loginForm} className='loginForm' onSubmit={this.login}>
                        <div className='login-row'>
                            <input ref={this.username} type='text' placeholder='用户名或者邮箱' onBlur={this.checkName}></input>
                            <span style={ this.state.nameError === true ? { display: 'block' } : { display: 'none' }}>用户名不能为空哦</span>
                        </div>
                        <div className='login-row'>
                            <input ref={this.password} type='password' placeholder='密码' onBlur={this.checkPass}></input>
                            <span style={ this.state.passError === true ? { display: 'block' } : { display: 'none' }}>密码不能为空哦</span>
                        </div>
                        <div className='login-row loginBtn'>
                            <input type='submit' value='登录'></input>
                            <Icon style={this.state.isloading === true ? { display: 'block' } : { display: 'none'}} type='loading' ></Icon>
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