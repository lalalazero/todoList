import React, { Component } from 'react'
import { Icon } from 'antd'
import { request } from '../../utils/request'
import './style.css'

export default class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            todo: {}
        }
    }
    fold = ()=>{
        const { foldSideBar } = this.props
        foldSideBar()
    }
    fetchItem = (id) => {
        request(`lists/items/detail?id=${id}`).then(res => {
            if(res.status === 0){
                this.setState({
                    todo: res.data
                })
            }
        })
    }
    render(){
        const { showSideBar, sideItemId  } = this.props
        this.fetchItem(sideItemId)
        return (
            <div className='sideBar' style={ showSideBar === true ? { diplay: 'block' } : { display: 'none'}}>
                <div className='title'>
                    {
                        this.state.todo.done === 0 ? <span className='check'></span> : <Icon type="check-square"></Icon>
                    }
                    <span>{this.state.todo.value}
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