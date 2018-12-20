import React, { Component } from 'react'
import Icon from 'antd/lib/icon';
import './style.css';

export default class SideNav extends Component {
    render(){
        return(
            <div className='sideNav'>
                <div className='menuBar'>
                    <Icon type='menu-unfold'></Icon>
                </div>
                <ul>
                    <li>menu1</li>
                    <li>menu2</li>
                    <li>menu3</li>
                </ul>
            </div>
        )
    }
}