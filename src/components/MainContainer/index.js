import React , { Component } from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import { connect } from 'react-redux'
import './style.css'


class MainContainer extends Component {
    render(){
        const {
            curListItem
        } = this.props
        return (
            <section className='mainContainer'>
            <header>{ curListItem.name }</header>
            <div>
                <AddTodo></AddTodo>
                <TodoItem
                 {...this.props}>
                </TodoItem>
            </div>
            
            </section>
        )
    }  
}

function mapStateToProps(state){
    return {
        curListItem: state.curListItem 
    }
}

export default connect(mapStateToProps)(MainContainer)

