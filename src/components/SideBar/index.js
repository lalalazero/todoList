import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { setContentVisibility } from './../../actions/list'
import { deleteTodo,modifyTodo,checkTodo } from './../../actions/todo'
import './style.css'

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            curItem: props.todo,
            note: '',
            title: '',
            editTitle:false
        }
        console.log('sidebar..init..',JSON.stringify(this.state.curItem))
        this.textarea = React.createRef()
    }
    componentWillReceiveProps(props){
        const todo = props.todo
        this.setState({
            curItem: Object.assign({},todo),
            note: todo.note || '',
            title: todo.value,
            editTitle: false
        })
        console.log('will receive props..',props.todo)
        document.querySelector('.title').removeAttribute('style')
    }
    
    resizeTitle = ()=>{
        const textarea = this.textarea.current
        const parent = textarea.parentNode
        let newHeight = textarea.scrollHeight + 20
        console.log(textarea.scrollHeight, parent.clientHeight)
        if(newHeight > 300){
            parent.style.height = '300px'
            return
        }
        if(newHeight >= parent.clientHeight){
            console.log('超过了')
            parent.style.height = `${newHeight}px`
        }
    }

    modify = ()=>{
        const { dispatch } = this.props
        let id,title,note;
        id = this.state.curItem.id
        title = this.state.title
        note = this.state.note
        dispatch(modifyTodo(id,title,note))
    }
    
    check = (status)=>{
        this.props.dispatch(checkTodo(this.state.curItem.id,status))
    }
    showEditTitle = (e)=>{
        console.log(e.target)
        const divHeight = e.target.clientHeight
        const divWidth = e.target.clientWidth
        console.log('divHeight...',divHeight)
        this.setState({ editTitle: true })
        document.querySelector('.title').style.height = 20 + divHeight + 'px'
        document.querySelector('.title').style.width = 80 + divWidth + 'px'
    }
    render(){
        const { visible } = this.props
        return (
            <div className='sideBar' style={ visible === true ? { diplay: 'block' } : { display: 'none'}}>
                <div className='title'>
                    {
                        (this.state.curItem.done === 0 ? 
                            <span onClick={()=>this.check(1)} className='check'></span> : 
                            <Icon onClick={()=>this.check(0)} type="check-square"></Icon>
                        )
                    }
                    {
                        this.state.editTitle === false ? <div onClick={this.showEditTitle}> {this.state.title} </div> : (
                            <textarea ref={this.textarea} value={this.state.title} maxLength={100}
                                onInput={this.resizeTitle} onBlur={this.modify}
                                onChange={event => this.setState({ title: event.target.value })}>
                            </textarea>
                            
                        )
                    }
                    
                    
                </div>
                <div className='content'>
                    <Icon type='edit'></Icon>
                    <textarea placeholder='添加备注' 
                    onChange={event => this.setState({ note: event.target.value })}
                    onBlur={this.modify}
                    value={this.state.note || ''}>
                    maxLength={100}
                    </textarea>
                </div>
                <div className='footOperators'>
                    <Icon type="right-circle" onClick={()=>this.props.dispatch(setContentVisibility(false))}/>
                    <Icon type='delete' onClick={()=>{this.props.dispatch(setContentVisibility(false));this.props.dispatch(deleteTodo(this.props.todo.id))}}></Icon>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        visible: state.contentVisible,
        todo: state.curTodo
    }
}

export default connect(mapStateToProps)(SideBar)