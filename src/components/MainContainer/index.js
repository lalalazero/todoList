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
        return (
            <section className='mainContainer'>
            <header>计划</header>
            <div>
                <AddTodo addTodoItem={addTodoItem}></AddTodo>
                <TodoItem 
                    handleDelete={deleteTodo} 
                    handleUpdate={updateTodoStatus} 
                    todoList={todoList}>
                </TodoItem>
            </div>
            
            </section>
        )
    }  
}

MainContainer.propTypes = {
    addTodoItem: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodoStatus: PropTypes.func.isRequired,
    todoList: PropTypes.array.isRequired
    
}