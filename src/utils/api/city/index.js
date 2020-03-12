// 城市相关后端接口

import axios from '../../axios'


//获取当前城市数据
export function getCityInfo(name) {
    //返回了一个Promise对象
    return axios.get('/area/info',{
        params:{
            name
        }
    })
}