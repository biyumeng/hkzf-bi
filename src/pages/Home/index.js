import React, { Component } from 'react';

import { Route } from 'react-router-dom'

import { TabBar } from 'antd-mobile';

import './index.css'

//导入路由对应组件
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';
// import { log } from 'util';

// 引入TabBar 数据
import tabItems from '../../utils/tabBar_config'


class Home extends Component {

    //TabBar状态数据
    state = {
        selectedTab: this.props.location.pathname
    }

    renderTanItems= ()=>{
      return  tabItems.map((item)=>{
            return (
                <TabBar.Item
                title={item.title}
                key={item.title}
                //默认的icon
                icon={
                    <i className={`iconfont ${item.icon}`} />
                }
                //选中的icon
                selectedIcon={
                    <i className={`iconfont ${item.icon}`} />
                }
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                    this.props.history.push(item.path)
                    this.setState({
                        selectedTab: item.path,
                    });
                    }}
                >
                </TabBar.Item>
            )
        })
    }

    render(){
        return (
            <div className="home">

                {/* 二级路由配置 */}
                <Route path="/home" exact component={Index}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/profile" component={Profile}></Route>

                {/* 全局导航 */}
                <div className="barBox">
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    >
                    
                    {
                        this.renderTanItems()
                    }

                    </TabBar>
                </div>

            </div>
        )
    }
}

export default Home;