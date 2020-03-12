// 首页后端接口

import axios from '../../axios'


//获取轮播图数据
export function getSwiper() {
    //返回了一个Promise对象
    return axios.get('/home/swiper')
}

//获取租房小组数据
export function getGroup(area='AREA|88cff55c-aaa4-e2e0') {
    //返回了一个Promise对象
    return axios.get('/home/groups',{
        params:{
            area
        }
    })
}

//获取最新资讯
export function getNews(area='AREA|88cff55c-aaa4-e2e0') {
    //返回了一个Promise对象
    return axios.get('/home/news',{
        params:{
            area
        }
    })
}