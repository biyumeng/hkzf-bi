import React, { Component } from 'react';

import { Route , Link } from 'react-router-dom'

//导入路由对应组件
import Index from '../Index';
import House from '../House';
import Profile from '../Profile';

class Home extends Component {
    render(){
        return (
            <div className="home">
                <p>
                    <Link to="/home/index">默认首页</Link>
                    <Link to="/home/house">找房</Link>
                    <Link to="/home/profile">我的</Link>                   
                </p>


                <Route path="/home/index" component={Index}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/profile" component={Profile}></Route>
            </div>
        )
    }
}

export default Home;