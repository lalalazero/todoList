import React, { Component } from 'react'
import { Icon } from 'antd'
import _ from 'lodash'
import './style.css'

export default class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            curItem: {},
            note: '',
            title: ''
        }
        this.textarea = React.createRef()
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
                note: sideItem.note,
                title: sideItem.value
            })
        }
    }
    resizeTitle = ()=>{
        const textarea = this.textarea.current
        const parent = textarea.parentNode
        let newHeight = textarea.scrollHeight + 20
        console.log(textarea.scrollHeight, parent.clientHeight)
        if(newHeight >= parent.clientHeight){
            console.log('超过了')
            parent.style.height = `${newHeight}px`
        }
    }
    updateNote = ()=>{
        const { updateTodo } = this.props
        updateTodo(this.state.curItem.id,this.state.curItem.value,this.state.note)
    }
    updateTitle = () => {
        const { updateTodo } = this.props
        updateTodo(this.state.curItem.id, this.state.title, this.state.curItem.note)
    }
    render(){
        const { showSideBar} = this.props
        return (
            <div className='sideBar' style={ showSideBar === true ? { diplay: 'block' } : { display: 'none'}}>
                <div className='title'>
                    {
                        this.state.curItem.done === 0 ? <span className='check'></span> : <Icon type="check-square"></Icon>
                    }
                    <textarea ref={this.textarea} value={this.state.title} maxLength={100}
                    onInput={this.resizeTitle} onBlur={this.updateTitle}
                    onChange={event => this.setState({ title: event.target.value })}>
                    </textarea>
                </div>
                <div className='content'>
                    <Icon type='edit'></Icon>
                    <textarea placeholder='添加备注' 
                    onChange={event => this.setState({ note: event.target.value })}
                    onBlur={this.updateNote}
                    value={this.state.note}>
                    maxLength={100}
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