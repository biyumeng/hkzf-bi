
// 定义公共方法，可复用方法

import { getCityInfo } from "./api/city";
// import { resolve, reject } from "q";

// 数据持久化
// 当前城市KEY
const CURR_CITY = 'hkzf_city';

export const getLocalData = (key) => {
  return localStorage.getItem(key)
}
export const setLocalData = (key, val) => {
  return localStorage.setItem(key, val)
}
export const removeLocalData = (key) => {
  return localStorage.removeItem(key)
}


export function getCurrCity (){
    //将本地存储的定位城市数据拿出来
    const currCity = JSON.parse(getLocalData(CURR_CITY));
    
    //如果本地存储没有数据就调用接口然后再添加到本地存储
    if (!currCity) {
        return new Promise((resolve,reject)=>{
            //定位
            let myCity = new window.BMap.LocalCity();
            //获取定位信息
            myCity.get(async (result)=>{
                let cityName = result.name;
                // 调取接口
                const res =await getCityInfo(cityName);
                // console.log(res)
                if (res.status===200) {
                    //存储的本地
                    setLocalData(CURR_CITY,JSON.stringify(res.data))
                    resolve(res.data)
                }else{
                    reject('error')
                }
            }); 
    
        }) 
    }else{
        //如果有直接输出
        return Promise.resolve(currCity)
    }
  
}

export {CURR_CITY};