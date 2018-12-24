import React from 'react'
import { Component } from 'react'
import SideNav from '../../components/SideNav'
import MainContainer from '../../components/MainContainer'

export default class Home extends Component{
  render(){
    return(
      <div style={{height: '100%'}}>
        <SideNav></SideNav>
        <MainContainer ></MainContainer>
      </div>
    );
  }
    
}