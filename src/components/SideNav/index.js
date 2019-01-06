import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.css';
import './iconFont.css';
import { connect } from 'react-redux'
import { loadUserList, switchList, addList,deleteList, updateList } from './../../actions/list'

class SideNav extends Component {

    constructor(props){
        super(props)
        this.state = {
            fold: false,
            modalVisible: false,
            newListName: '',
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
        //this.queryUserLists()
        console.log('sideNav did mount...')
        const userId = localStorage.getItem('userId')
        this.props.dispatch(loadUserList(userId))
    }

    componentWillReceiveProps(props){
       this.setState({
           curName: props.curListItem.name
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
        const name = this.state.newListName;
        this.setState({
            modalVisible: false,
            newListName: ''
        })
        this.props.dispatch(addList(name))
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
    editList = (e)=>{
        if(this.state.editBtnDisabled) return
        this.setState({
            updateModalVisible: false
        })
        const name = this.state.curName
        if(name === this.props.curListItem.name) return // 没有发生改变
        this.props.dispatch(updateList(name,this.props.curListItem.id))
    }

    deleteList = ()=>{
        this.setState({
            updateModalVisible: false
        })
        this.props.dispatch(deleteList(this.props.curListItem.id))
    }

    showUpdateModal = ()=>{
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
                        {
                            this.props.list.map((item, i) => {
                                return ( 
                                    item.userCreate === 0 ? <li key={i} 
                                    className='schedule' 
                                    onClick={()=>this.props.dispatch(switchList(item.id))}
                                    isactive={this.props.curListId === item.id ? 'yes' : 'no'}>
                                        <Icon type='schedule'></Icon>
                                        <span>{ item.name }</span>
                                        <span name='count'>{ item.validCount > 0 ? item.validCount : '' }</span>
                                    </li> : 
                                    item.userCreate === 1 &&
                                    <li key={i} onClick={() => this.props.dispatch(switchList(item.id))} 
                                    isactive={this.props.curListId === item.id ? 'yes' : 'no'}>
                                        <Icon type='bars'></Icon>
                                        <span>{ item.name }</span>
                                        <i className='iconfont icon-edit' onClick={this.showUpdateModal}></i>
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
                            <button onClick={this.editList} style={this.state.editBtnDisabled === true ? {color: '#ccc'} : {}}>修改</button>
                            <button onClick={this.deleteList}>删除清单</button>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

function mapStateToProps(state){
    return{
        list: state.userList || [],
        curListId: state.curListId,
        curListItem: state.curListItem
        
    }
}

export default connect(mapStateToProps)(SideNav)