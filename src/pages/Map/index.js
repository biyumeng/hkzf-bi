// 地图找房

import React, { Component } from 'react';
import { NavBar , Icon } from 'antd-mobile';
import './index.css'
// import { getCityInfo } from '../../utils/api/city';

class Map extends Component {
    componentDidMount(){
        this.initMap()
    }

    //初始化百度地图
    initMap=()=>{
        // 1.新建地图实例
        let map = new window.BMap.Map("container");
        // 2.设置中心点坐标（天安门）
        let point = new window.BMap.Point(116.404, 39.915);
        // 3.地图初始化，同时设置地图展示级别
        map.centerAndZoom(point, 15);

        //定位
        function myFun(result){
            var cityName = result.name;
            map.setCenter(cityName);
            alert("当前定位城市:"+cityName);
        }

        //定位
        let myCity = new window.BMap.LocalCity();
        //获取定位信息
        // myCity.get(async (result)=>{
        //     let cityName = result.name;
        //     const res =await getCityInfo(cityName);
        //     console.log(res)
        // }); 
        myCity.get(myFun)
    }

    render(){
        return (
            <div className="mapBox">
                {/* 返回导航 */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >地图找房</NavBar>

                {/* 百度地图显示位置 */}
                <div id="container"></div> 
            </div>
        )
    }
}

export default Map;