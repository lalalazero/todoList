import React, { Component } from 'react'
import { Icon } from 'antd'
import _ from 'lodash'
import './style.css'

export default class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            curItem: {},
            note: ''
        }
    }
    fold = ()=>{
        const { foldSideBar } = this.props
        foldSideBar()
    }
    delete = ()=> {
        const { deleteTodo } = this.props
        this.fold()
        deleteTodo(this.props.sideItem.id)
    }

    componentWillReceiveProps(nextProps){
        const sideItem = nextProps.sideItem
        if(!_.isEmpty(sideItem)){
            console.log(sideItem)
            this.setState({
                curItem: sideItem,
                note: sideItem.note
            })
        }
    }
    updateNote = ()=>{
        const newNote = this.state.note
        const { updateTodo } = this.props
        updateTodo(this.state.curItem.id,this.state.curItem.value,newNote)
    }
    render(){
        const { showSideBar} = this.props
        return (
            <div className='sideBar' style={ showSideBar === true ? { diplay: 'block' } : { display: 'none'}}>
                <div className='title'>
                    {
                        this.state.curItem.done === 0 ? <span className='check'></span> : <Icon type="check-square"></Icon>
                    }
                    <span>{this.state.curItem.value}
                    </span>
                </div>
                <div className='content'>
                    <Icon type='edit'></Icon>
                    <textarea placeholder='添加备注' 
                    onChange={event => this.setState({ note: event.target.value })}
                    onBlur={this.updateNote}
                    value={this.state.note}>
                    </textarea>
                </div>
                <div className='footOperators'>
                    <Icon type="right-circle" onClick={this.fold}/>
                    <Icon type='delete' onClick={this.delete}></Icon>
                </div>
            </div>
        )
    }
}