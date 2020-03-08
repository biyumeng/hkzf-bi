import React from 'react';
// import { Button , Checkbox } from 'antd-mobile'

import { BrowserRouter as Router, Route , Link , Switch } from 'react-router-dom'

// const CheckboxItem = Checkbox.CheckboxItem;
//导入路由对应组件
import Home from './pages/Home';
import CityList from './pages/CityList';
import Map from './pages/Map';
import NotFount from './pages/NotFount';

function App() {
  return (
    <Router className="app">
      <Link to="/home">首页</Link>
      <Link to="/cityList">城市列表</Link>
      <Link to="/map">地图</Link>
      <Switch>
        {/* 一级路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/cityList" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>

        {/* 404页面 */}
        <Route component={NotFount}></Route>
      </Switch>
      
    </Router>
  );
}

export default App;
