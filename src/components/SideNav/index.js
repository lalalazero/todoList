import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.css';

export default class SideNav extends Component {
    
    render(){
        return(
            <div className='sideNav'>
                <div className='menuBar'>
                    <Icon className='menuIcon' type='menu-unfold'></Icon>
                </div>
                <div className='userInfo'>
                    <img src='' alt='selfile'/>
                    <span className='userName' >夏了个夏天</span>
                    <Icon className='' type='down'></Icon>
                </div>
                <ul className='list'>
                    <li className='schedule'>
                        <Icon type='schedule'></Icon>
                        <span>计划</span>
                    </li>
                    <li className='calendar'>
                        <Icon type='calendar'></Icon>
                        <span>今天</span>
                    </li>
                    <li>
                        <Icon type='bars'></Icon>
                        <span>工作</span>
                    </li>
                    <li>
                        <Icon type='bars'></Icon>
                        <span>生活</span>
                    </li>
                    <li>
                        <Icon type='bars'></Icon>
                        <span>元旦晚会</span>
                    </li>
                </ul>
                <div className='addListContainer'>
                    <Icon type='plus'></Icon>
                    <span>Create list</span>
                </div>
            </div>
        )
    }
}