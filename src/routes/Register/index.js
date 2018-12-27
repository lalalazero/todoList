import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { message, Icon } from 'antd'
import { PropTypes } from 'prop-types'
import { request } from '../../utils/request'

export default class Register extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props,context){
        super(props,context)
        this.state = {
            passError: false,
            nameError: false,
            isloading: false
        }
        this.registerForm = React.createRef()
    }
    register = (e) => {
        e.preventDefault()
        if(this.state.passError || this.state.nameError){
            return;
        }
        if(this.state.isloading){
            console.log('正在请求中...return')
            return;
        }

        this.setState({
            isloading: true
        })
        const form = this.registerForm.current
        const username = form.querySelector("input[name='username']").value
        const password = form.querySelector("input[name='password']").value
        request('register',{
            method: 'POST',
            body: {
                username: username,
                password: password
            }
        }).then(res => {
            this.setState({
                isloading: false
            })
            if(res.status === 0){
                message.success('注册成功')
                localStorage.setItem('userId',res.data)
                this.context.router.history.push('/home')
            }else{
                message.error(res.msg)
            }
        })
        

    }

    checkPass = (e) => {
        if(e.target.value.trim() === ''){
            this.setState({
                passError: true
            })
        }else{
            this.setState({
                passError: false
            })
        }  
    }
    checkName = (e) => {
        if(e.target.value.trim() === ''){
            this.setState({
                nameError: true
            })
        }else{
            this.setState({
                nameError: false
            })
        }
    }
    render(){
        return (
            <div className='loginBg'>
                <div className='panel'>
                    <h2>零待办 · 清单利器</h2>
                    <form ref={this.registerForm} className='loginForm' onSubmit={this.register}>
                        <div className='login-row'>
                            <input name='username' type='text' placeholder='用户名或者邮箱' onBlur={this.checkName}></input>
                            <span style={ this.state.nameError === true ? {display: 'block'}:{display: 'none'}}>用户名不能为空哦</span>
                        </div>
                        <div className='login-row'>
                            <input name='password' type='password' placeholder='密码' onBlur={this.checkPass}></input>
                            <span style={ this.state.passError === true ? { display: 'block'} : { display: 'none'}}>密码不能为空哦</span>
                        </div>
                        <div className='login-row loginBtn'>
                            <input type='submit' value='注册'></input>
                            <Icon style={this.state.isloading === true ? { display: 'block' } : { display: 'none'}} type='loading' ></Icon>
                        </div>
                    </form>
                    <div className='loginOptions'>
                        <Link to='/login' >已有账号，去登录</Link>
                    </div>
                </div>
            </div>
        )
    }
}