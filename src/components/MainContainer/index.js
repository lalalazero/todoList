import React , { Component } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import './style.css'
import { connect } from 'react-redux'

class MainContainer extends Component {
    render(){
        const {
            addTodoItem,
            deleteTodo,
            updateTodoStatus,
            todoList
        } = this.props
        return (
            <section className='mainContainer'>
            <header>{this.props.curList.name || '计划'} </header>
            <div>
                <AddTodo addTodoItem={addTodoItem}></AddTodo>
                <TodoItem
                handleDelete={deleteTodo} 
                handleUpdate={updateTodoStatus} 
                todoList={todoList}
                 {...this.props}>
                </TodoItem>
            </div>
            
            </section>
        )
    }  
}

function xxx(state){
    return({
        curList: state.curList
    })
}
export default connect(xxx, null)(MainContainer)

