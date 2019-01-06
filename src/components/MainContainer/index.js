import React  from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'
import './style.css'


const MainContainer = (props) => {
    return (
        <section className='mainContainer'>
        <header>{ props.curListItem.name }</header>
        <div>
            <AddTodo></AddTodo>
            <TodoItem></TodoItem>
        </div>
        </section>
    )
}

function mapStateToProps(state){
    return {
        curListItem: state.curListItem 
    }
}

export default connect(mapStateToProps)(MainContainer)

