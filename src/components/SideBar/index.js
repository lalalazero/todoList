import React, { Component } from 'react'
import { Icon } from 'antd'
import './style.css'

export default class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    fold = ()=>{
        const { foldSideBar } = this.props
        foldSideBar()
    }
    render(){
        const { showSideBar } = this.props
        return (
            <div className='sideBar' style={ showSideBar === true ? { diplay: 'block' } : { display: 'none'}}>
                <div className='title'>
                    <span className='check'></span>
                    <span>很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字
                    很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字很多字
                    很多字很多字很多字
                    </span>
                </div>
                <div className='content'>
                    <Icon type='edit'></Icon>
                    <textarea placeholder='添加备注'></textarea>
                </div>
                <div className='footOperators'>
                    <Icon type="right-circle" onClick={this.fold}/>
                    <Icon type='delete'></Icon>
                </div>
            </div>
        )
    }
}