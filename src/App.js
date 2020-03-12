import React from 'react';
// import { Button , Checkbox } from 'antd-mobile'

import { BrowserRouter as Router, Route , Switch , Redirect } from 'react-router-dom'

// const CheckboxItem = Checkbox.CheckboxItem;
//导入路由对应组件
import Home from './pages/Home';
import CityList from './pages/CityList';
import Map from './pages/Map';
import NotFount from './pages/NotFount';

function App() {
  return (
    <Router className="app">
      <Switch>
        {/* 重定向 */}
        {/* 方法1 */}
        {/* <Redirect exact from="/" to="/home" /> */}
        {/* 方法2 */}
        <Route path="/" exact render={()=><Redirect to="/home" />} />
        {/* 一级路由 */}
        {/* 首页 在home下配置二级路由（home文件夹内） */}
        <Route path="/home" component={Home}></Route>
        {/* 城市列表 */}
        <Route path="/cityList" component={CityList}></Route>
        {/* 地图找房 */}
        <Route path="/map" component={Map}></Route>

        {/* 404页面 */}
        <Route component={NotFount}></Route>
      </Switch>
      
    </Router>
  );
}

export default App;
