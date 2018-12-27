import React from 'react'
import { Component } from 'react'
import SideNav from '../../components/SideNav'
import MainContainer from '../../components/MainContainer'

export default class Home extends Component{
  render(){
    console.log('Home..props..', this.props)
    return(
      <div style={{height: '100%'}}>
        <SideNav {...this.props}></SideNav>
        <MainContainer {...this.props}></MainContainer>
      </div>
    );
  }
    
}