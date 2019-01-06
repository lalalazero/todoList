import React from 'react'
import SideNav from '../../components/SideNav'
import MainContainer from '../../components/MainContainer'
import SideBar from '../../components/SideBar'

const Home = ()=>{
  return(
    <div style={{height: '100%', display: 'flex'}}>
      <SideNav ></SideNav>
      <MainContainer ></MainContainer>
      <SideBar ></SideBar>
    </div>
  )
}

export default Home;