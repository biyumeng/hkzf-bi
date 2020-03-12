//城市列表

import React, { Component } from 'react';

import { getCityList } from '../../utils/api/city';


class CityList extends Component {
    componentDidMount(){
        this.getCityData()
    }

    //获取城市列表数据
    getCityData=async ()=>{
        const { status , data } =await getCityList()
        console.log(data);
        if (status===200) {
            const {cityIndex,cityList} = this.formatCities(data)
            console.log(cityList,cityIndex)
        }
    }

    //处理数据
    formatCities=(data)=>{
        // 城市归类的数据
        let cityList = {};
        let cityIndex=[];
        data.forEach((item)=>{
            // 数组排重
            //截器城市拼音首字母
            let cfirst = item.short.slice(0,1);
            // console.log(cfirst);
            if (!cityList[cfirst]) {
                //如果没有这个城市拼音首字母
                cityList[cfirst] = [item]
            }else{
                cityList[cfirst].push(item)
            }
        })
        //取出所有拼音首字母放到数组里
        cityIndex = Object.keys(cityList).sort();
        return {
            cityIndex,
            cityList
        }
    }

    render(){
        return (
            <div>
                CityList
            </div>
        )
    }
}

export default CityList;