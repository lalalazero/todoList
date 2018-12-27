import React from 'react'
import { Component } from 'react'
import SideNav from '../../components/SideNav'
import MainContainer from '../../components/MainContainer'

export default class Home extends Component{
  render(){
    const { list } = this.props
    console.log('list....', list)
    return(
      <div style={{height: '100%'}}>
        <SideNav></SideNav>
        <MainContainer ></MainContainer>
      </div>
    );
  }
    
}