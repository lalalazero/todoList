import React, { Component } from 'react'
import './style.css'

export default class SideNav extends Component {
    render(){
        return(
            <div className='sideNav'>
                <ul>
                    <li>menu1</li>
                    <li>menu2</li>
                    <li>menu3</li>
                </ul>
            </div>
        )
    }
}