import React,  { Component } from 'react'
import { Icon } from 'antd';
import { connect } from 'react-redux'
import { addTodo } from './../../../actions/todo'
import './style.css'
class AddTodo extends Component {
    constructor(props){
      super(props)
      this.input = React.createRef()
      this.state = {
        onInput: false,
        value:''
      }
    }
    handleKeydown = (e) => {
      if(e.keyCode === 13){ // 回车键
        this.submit(e.target.value)
      }
    }
    submit = (value)=>{
      if(value.trim() === '') return
        this.props.dispatch(addTodo(value))
        this.setState({
          value:''
        })
    }
    render() {
      return (
        <div className='addTodoArea'>
          <Icon type='plus' onClick={()=>this.submit(this.state.value)}></Icon>
          <input type='text' value={this.state.value} onChange={e => this.setState({value: e.target.value})}
            placeholder='Add a todo...' 
            onKeyDown={this.handleKeydown}
          >
          </input>
        </div>
      )
    }
}

export default connect()(AddTodo)