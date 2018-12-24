import React, { Component } from 'react';
import { Icon, message } from 'antd';
import './style.css';
import { request } from '../../utils/request'

export default class SideNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            fold: false,
            list: [],
            modalVisible: false,
            newListName: ''
        }
    }

    imgsrc = 'http://pis5t89ex.bkt.clouddn.com/selfile.png'

    foldNavBar = () => {
        let fold = !this.state.fold
        this.setState({
            fold: fold
        })
    }

    componentDidMount(){
        this.queryLists()
    }

    queryInboxItems = ()=>{

    }

    queryLists = () => {
        const userid = 1
        request(`lists?userid=${userid}`).then(res => {
            if(res.status === 0){
                this.setState({
                    list: res.data
                })
            }
        })
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
            newListName: ''
        })
    }

    hideModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    saveList = () => {
        const userid = 1
        const name = this.state.newListName;
        request(`lists?userid=${userid}&name=${name}`,{ method: 'POST'}).then(res => {
            if(res.status === 0){
                message.success('创建成功')
                this.setState({
                    modalVisible: false,
                    newListName: ''
                })
                this.queryLists()
            }else{
                message.error(res.msg)
            }
        })
    }

    render(){
        const unfoldNav = () => {
            return(
                <div className='sideNav'>
                    <div className='menuBar'>
                        <Icon className='menuIcon' type='menu-unfold' onClick={this.foldNavBar}></Icon>
                    </div>
                    <div className='userInfo'>
                        <img src={this.imgsrc} alt='selfile'/>
                        <span className='userName' >夏了个夏天</span>
                        <Icon className='' type='down'></Icon>
                    </div>
                    <ul className='list'>
                        <li className='schedule'>
                            <Icon type='schedule'></Icon>
                            <span>计划</span>
                        </li>
                        {/* <li className='calendar'>
                            <Icon type='calendar'></Icon>
                            <span>今天</span>
                        </li> */}
                        {/* <li>
                            <Icon type='bars'></Icon>
                            <span>工作</span>
                        </li>
                        <li>
                            <Icon type='bars'></Icon>
                            <span>生活</span>
                        </li>
                        <li>
                            <Icon type='bars'></Icon>
                            <span>元旦晚会</span>
                        </li> */}
                        {
                            this.state.list.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <Icon type='bars'></Icon>
                                        <span>{ item.name }</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='addListContainer' onClick={this.showModal}>
                        <Icon type='plus'></Icon>
                        <span>创建新的清单</span>
                    </div>
                </div>

            )
        }

        const foldNav = () => {
            return(
                <div className='sideNav fold'>
                    <div className='menuBar'>
                        <Icon className='menuIcon' type='menu-unfold' onClick={this.foldNavBar}></Icon>
                    </div>
                    <div className='userInfo'>
                        <img src={this.imgsrc} alt='selfile'/>
                    </div>
                    <ul className='list'>
                        {/* <li className='schedule'>
                            <Icon type='schedule'></Icon>
                        </li>
                        <li className='calendar'>
                            <Icon type='calendar'></Icon>
                        </li> */}
                        <li>
                            <Icon type='bars'></Icon>
                        </li>
                        <li>
                            <Icon type='bars'></Icon>
                        </li>
                        <li>
                            <Icon type='bars'></Icon>
                        </li>
                    </ul>
                    <div className='addListContainer'>
                        <Icon type='plus'></Icon>
                    </div>
                </div>
            )
        }

        return(
           <div style={{height: '100%', display: 'inline'}}>
                {
                    this.state.fold === true ? foldNav() : unfoldNav()
                }
                <div className="createListModalBg" style={ this.state.modalVisible === true ? { display: 'block' } : { display: 'none'}}>
                    <div className="createListModal">
                        <h2>创建新的清单</h2>
                        <input type='text' value={this.state.newListName} placeholder='清单名字' onChange={(e)=> this.setState({ newListName: e.target.value})}></input>
                        <div>
                            <button onClick={this.hideModal}>取消</button>
                            <button onClick={this.saveList}>保存</button>
                        </div>
                        
                    </div>
                </div>
           </div>
        )
    }
}