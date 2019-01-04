import React from 'react'
import { Component } from 'react'
import SideNav from '../../components/SideNav'
import MainContainer from '../../components/MainContainer'
import SideBar from '../../components/SideBar'
import { connect } from 'react-redux'
class Home extends Component{
  render(){
    return(
      <div style={{height: '100%', display: 'flex'}}>
        <SideNav {...this.props}></SideNav>
        <MainContainer {...this.props}></MainContainer>
        <SideBar {...this.props}></SideBar>
      </div>
    );
  }
}

export default Home;