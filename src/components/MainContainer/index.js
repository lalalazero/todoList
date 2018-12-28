import React , { Component } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'
import './style.css'


export default class MainContainer extends Component {
    render(){
        const {
            addTodoItem,
            deleteTodo,
            updateTodoStatus,
            todoList
        } = this.props
        console.log('maincontainer...props...',this.props)
        return (
            <section className='mainContainer'>
            <header>计划</header>
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

