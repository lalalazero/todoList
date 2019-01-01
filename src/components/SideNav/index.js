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
            newListName: '',
            curList: -1,
            btnDisabled: true,
        }
        this.inboxList = -1
    }

    imgsrc = 'https://lalalazero.top/todo/selfie/my.png'

    foldNavBar = () => {
        let fold = !this.state.fold
        this.setState({
            fold: fold
        })
    }

    componentDidMount(){
        this.queryUserLists()
    }

    // 查询用户创建的清单
    queryUserLists = () => {
        const userid = localStorage.getItem('userId')
        request(`lists?userid=${userid}`).then(res => {
            if(res.status === 0){
                let userList = [];
                res.data.forEach(obj => {
                    if(obj.userCreate === 1){
                        userList.push(obj);
                    }else if(obj.userCreate === 0 && obj.name === '计划'){
                        this.inboxList = obj.id;
                    }
                })
                if(this.inboxList !== -1){
                    this.props.queryListItems(this.inboxList, 0)
                    this.props.updateCurList(this.inboxList)
                }
                this.setState({
                    list: userList
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
        if(this.state.btnDisabled) return
        const userid = localStorage.getItem('userId')
        const name = this.state.newListName;
        request(`lists?userid=${userid}&name=${name}`,{ method: 'POST'}).then(res => {
            if(res.status === 0){
                message.success('创建成功')
                this.setState({
                    modalVisible: false,
                    newListName: ''
                })
                this.queryUserLists()
            }else{
                message.error(res.msg)
            }
        })
    }

    checkEmpty = (e)=>{
        const value = e.target.value
        if(value.trim() === ''){
            this.setState({
                btnDisabled: true
            })
        }else{
            this.setState({
                btnDisabled: false
            })
        }
        
    }

    handleListClick = (item)=>{
        console.log('list clicked...',item)
        this.setState({
            curList: item.id
        })
        console.log(this.props)
        const { queryListItems, updateCurList, foldSideBar} = this.props
        updateCurList(item.id)
        queryListItems(item.id, 0)
        foldSideBar()



    }
    clickDefaultList = (e) => {
        this.setState({
            curList: -1
        })
        const {  queryListItems, updateCurList, foldSideBar } = this.props
        updateCurList(this.inboxList)
        queryListItems(this.inboxList, 0)
        foldSideBar()
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
                        <li className='schedule' curlist={this.state.curList === -1 ? 'yes' : 'no'} onClick={this.clickDefaultList}>
                            <Icon type='schedule'></Icon>
                            <span>计划</span>
                        </li>
                        {
                            this.state.list.map((item, i) => {
                                return (
                                    <li key={i} onClick={() => this.handleListClick(item)} curlist={this.state.curList === item.id ? 'yes' : 'no'}>
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
                        <li className='schedule'>
                            <Icon type='schedule'></Icon>
                        </li>
                        {/* <li className='calendar'>
                            <Icon type='calendar'></Icon>
                        </li> */}
                        <li onClick={this.foldNavBar}>
                            <Icon type='ellipsis'></Icon>
                        </li>
                    
                    </ul>
                    <div className='addListContainer' onClick={this.showModal}>
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
                        <input type='text' value={this.state.newListName} placeholder='清单名字' onInput={e => this.checkEmpty(e)} onChange={(e)=> this.setState({ newListName: e.target.value})}></input>
                        <div>
                            <button onClick={this.hideModal}>取消</button>
                            <button style={this.state.btnDisabled === true ? {color: '#ccc'} : {}} onClick={this.saveList}>保存</button>
                        </div>
                        
                    </div>
                </div>
           </div>
        )
    }
}