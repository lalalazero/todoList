import React, { Component } from 'react';
import { Icon, message, notification } from 'antd';
import './style.css';
import './iconFont.css';
import { request } from '../../utils/request'
import { connect } from 'react-redux'
import switchList from './../../actions'

class SideNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            fold: false,
            modalVisible: false,
            newListName: '',
            curList: -1,
            btnDisabled: true,
            updateModalVisible: false,
            curName: '',
            editBtnDisabled: false,
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
                this.props.loadLists(userList)
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
    checkEditEmpty = (e) => {
        const value = e.target.value
        console.log(value)
        if(value.trim() === ''){
            this.setState({
                editBtnDisabled: true
            })
        }else{
            this.setState({
                editBtnDisabled: false
            })
        }
    }
    editClick = ()=>{
        if(this.state.editBtnDisabled) return
        this.setState({
            updateModalVisible: false
        })
        const name = this.state.curName
        const id = this.state.curList
        request(`lists?id=${id}&name=${name}`,{ method: 'PUT' }).then(res => {
            if(res.status === 0){
                this.queryUserLists()
            }else{
                notification.error(res.msg)
            }
        })
    }

    deleteList = ()=>{
        this.setState({
            updateModalVisible: false
        })
        request(`lists?id=${this.state.curList}`,{ method: 'DELETE' }).then(res => {
            if(res.status === 0){
                //window.location.reload()
                this.queryUserLists()
            }else{
                notification.error(res.msg)
            }
        })
    }

    handleListClick = (item)=>{
        console.log('list clicked...',item)
        this.setState({
            curList: item.id,
            curName: item.name
        })
        console.log(this.props)
        const { queryListItems, updateCurList, foldSideBar} = this.props
        updateCurList(item.id)
        queryListItems(item.id, 0)
        foldSideBar()
        this.props.switchList(item.id)



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

    updateList = ()=>{
        this.setState({
            updateModalVisible: true,
            editBtnDisabled: false
        })
    }

    render(){
        const unfoldNav = (
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
                            this.props.lists.map((item, i) => {
                                return (
                                    <li key={i} onClick={() => this.handleListClick(item)} curlist={this.state.curList === item.id ? 'yes' : 'no'}>
                                        <Icon type='bars'></Icon>
                                        <span>{ item.name }</span>
                                        <i className='iconfont icon-edit' onClick={this.updateList}></i>
                                        <span name='count'>{ item.validCount > 0 ? item.validCount : ''}</span>
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
        

        const foldNav = (
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
        

        return(
           <div style={{height: '100%', display: 'inline'}}>
                {
                    this.state.fold === true ? foldNav : unfoldNav
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
                <div className="updateListModalBg" style={ this.state.updateModalVisible === true ? {display: 'block'}: { display: 'none'}}>
                    <div className="updateListModal">
                        <h2>编辑清单</h2>
                        <input type='text' value={this.state.curName}
                            onChange={e => { this.setState({curName: e.target.value}); this.checkEditEmpty(e)}}
                        ></input>
                        <div>
                            <button onClick={()=> this.setState({ updateModalVisible: false })}>取消</button>
                            <button onClick={this.editClick} style={this.state.editBtnDisabled === true ? {color: '#ccc'} : {}}>修改</button>
                            <button onClick={this.deleteList}>删除清单</button>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

function xxx(state){
    return({
        todos: state.todos,
        lists: state.lists
    })
}

function yyy(dispatch, ownProperties){
    return({
        loadLists: (data)=>{
            dispatch({
                type: 'lists',
                payload: data
            }) 
        },
        switchList:(listId)=>{
            dispatch({
                type: 'switchList',
                payload: listId
            })
        }
    })
}

export default connect(xxx,yyy)(SideNav)