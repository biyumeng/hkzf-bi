// 房源相关后端接口

import axios from '../../axios'


//获取房源查询条件数据
export function getPickerData(id) {
    //返回了一个Promise对象
    return axios.get('/houses/condition',{
        params:{
            id
        }
    })
}

//获取房源列表数据
export function getHouseList(id, filters, start=1 , end=20) {
    //返回了一个Promise对象
    return axios.get('/houses',{
        params:{
            id,
            ...filters,
            start,
            end
        }
    })
}

